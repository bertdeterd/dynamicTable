sap.ui.controller("dynamictable.Main", {
	
	_mainController: "",

	onInit: function() {
		
		_mainController = this;

		//1. Get Model
		var url = "http://saperp65.s.creetion.com:8000/sap/opu/odata/sap/ZCOURSE_001_SRV/";
		var oModel = new sap.ui.model.odata.ODataModel(url);
		sap.ui.getCore().setModel(oModel);

		//2. Get ServiceMetadata object from Model
		var oMeta = oModel.getServiceMetadata();

		//3. Get Entity Type PurchaseOrder
		var _selectedEntity=null;
		$.each(oMeta.dataServices.schema[0].entityType, function(index, obj) {
			if (obj.name == "PurchaseOrder" ) {
				_selectedEntity = obj;
				return false;
			}
		});
		
		//4. Get Table Object
		var oTable = sap.ui.getCore().byId("tblResults");

		//5. Add Columns to Table
		$.each(_selectedEntity.property, function(index, obj) {
			var oColumn = new sap.ui.table.Column({
				label : new sap.ui.commons.Label({
					text : obj.name
				}),
				template : new sap.ui.commons.TextView().bindProperty("text", obj.name),
			});
			oTable.addColumn(oColumn);
		});
		
		//6. Bind Collection to Table 
		var path = "/PurchaseOrderCollection";
		oTable.bindRows({
			path: path, 
		});
		//oTable.setModel(oModel);

	},
	
	onExecuteFilter: function(oEvent){
		
		//1. Get Table Object
		var oTable = sap.ui.getCore().byId("tblResults");
		
		//2. Create Filter 
		var arrFilter=[];
		var field = "CompanyCode";
		var value = "CR";
		var defaultFilterOperator = sap.ui.model.FilterOperator.Contains;
		arrFilter.push( new sap.ui.model.Filter(field, defaultFilterOperator, value) );
		
		//3. Filter 
		var path = "/PurchaseOrderCollection";
		oTable.bindRows({
			path: path, 
			filters: arrFilter
		});
		
		
	},
	

	onExecuteDeepInsert: function(oEvent){

		var obj = {};
		
		obj.PurchaseOrderID = "1";
		obj.CreatedBy = "20111202";
		obj.VendorID = "";
        obj.CompanyCode = "";
		obj.PurchaseOrderItems = [];
		
		var itm1 = {};
		itm1.PurchaseOrderID = "1";
		itm1.ItemID = "11";
		itm1.Material = "";
		itm1.Quantity = "1";
		obj.PurchaseOrderItems.push(itm1);
		
		var itm2 = {};
		itm2.PurchaseOrderID = "1";
		itm2.ItemID = "12";
		itm2.Material = "";
		itm2.Quantity = "1";
		obj.PurchaseOrderItems.push(itm2);

		var mod = sap.ui.getCore().getModel();
		mod.create("/PurchaseOrderCollection", obj, null, _mainController.onSuccess, _mainController.onError);
	},

	onSuccess: function(d, r){
		sap.ui.commons.MessageBox.show("Ok dan" + d.PurchaseOrderID);
	},

	onError: function(evt){
		sap.ui.commons.MessageBox.show("Jammer dan");
	},

	
	
onExecuteSorter: function(oEvent){
		
		//1. Get Table Object
		var oTable = sap.ui.getCore().byId("tblResults");
		
		//2. Create Sorter 
		var sorter = new sap.ui.model.Sorter("CompanyCode",true);
		
		//3. Sorter
		var path = "/PurchaseOrderCollection";
		oTable.bindRows({
			path: path, 
			sorter: sorter,
		});
		
		
	},
	
	
	
	//parameters: { select: "Ext_Ref,Ext_Key"},
	//sorter: sorter,
	//filters: aFilter

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf dynamictable.Main
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf dynamictable.Main
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf dynamictable.Main
*/
//	onExit: function() {
//
//	}

});