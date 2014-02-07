sap.ui.jsview("dynamictable.Main", {

	
	getControllerName : function() {
		return "dynamictable.Main";
	},
	
	

	createContent : function(oController) {
		
		var oBtn = new sap.ui.commons.Button({
			text: "Hello Filter", 
			press: oController.onExecuteFilter 
		});
		
		var oBtnS = new sap.ui.commons.Button({
			text: "Hello Sorter", 
			press: oController.onExecuteSorter 
		});
		
		var oBtnD = new sap.ui.commons.Button({
			text: "Hello Deep Insert", 
			press: oController.onExecuteDeepInsert 
		});
		
				
		var oTable = new sap.ui.table.Table("tblResults",{
	        visibleRowCount: 20, 
	        enableColumnReordering: true,
	        showColumnVisibilityMenu:true,
	        selectionMode: sap.ui.table.SelectionMode.Single,
	        toolbar: new sap.ui.commons.Toolbar({items: [ oBtn, oBtnS, oBtnD ]}),
		});
		
		return oTable;

	}

});


