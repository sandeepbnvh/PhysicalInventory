sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller,Filter,FilterOperator) {
		"use strict";

		return Controller.extend("com.gsk.zphysicalinventory.controller.worklist", {
			onInit: function () {
				
			},
			onSearchStorageBin : function (oEvent) {
				
			
				
					var oTableSearchState = [],
					
					
					sQuery = oEvent.getParameter("query");
	
	 
	
				if (sQuery && sQuery.length > 0) {
					oTableSearchState = [new Filter("storageBin", FilterOperator.Contains, sQuery)];
				}
	
	 
	
				this.getView().byId("tableSearch").getBinding("items").filter(oTableSearchState, "Application");
			
	
				},
				_applySearch: function(aTableSearchState) {
					var oTable = this.byId("table"),
						oViewModel = this.getModel("worklistView");
					oTable.getBinding("items").filter(aTableSearchState, "Application");
					// changes the noDataText of the list in case there are no filter results
					if (aTableSearchState.length !== 0) {
						oViewModel.setProperty("/tableNoDataText", this.getResourceBundle().getText("worklistNoDataWithSearchText"));
					}
				},
				onSearchStorageBina: function() {
			
				//	var NotfNo = this.getView().byId("idBin").getValue();
					
					if(NotfNo==""){
						
						sap.m.MessageBox.error("Error"); 
						
					}else{
		
					//var baseUrl = "./model/data.json";
					var oModel = new sap.ui.model.json.JSONModel(baseUrl, true);
					var url = "/SearchQM/NotifSet?$filter=";
					if (NotfNo != "") {
						url = url + " Qmnum eq '" + NotfNo  + "' and ";
					}
					
		
					url=url.substring(0, url.length-4);
		
					var notificationSearchModel = new sap.ui.model.json.JSONModel();
					var that = this;
					oModel.read(url, null, null, true, function(oData, response) {
						notificationSearchModel.setData(oData.results);
						//that.busyInd.close();
		
						if (oData.results.length == 0) {
							sap.m.MessageBox.error(that.getView().getModel("i18n").getResourceBundle().getText("CCSearchNoData"));
		
						}
		
						//that.getOwnerComponent().setModel(DeliveryAddressModel, "DeliveryAddressModel");
						that.getView().byId("tableSearch").setModel(notificationSearchModel, "notificationSearchModel");
		
					});
					}
		
				}
		});
	});
