sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Sorter",
    "sap/m/Dialog",
    "sap/m/Input",
    "sap/m/Button",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator, Sorter, Dialog, Input, Button) {
        "use strict";

        return Controller.extend("com.movie.controller.Master", {
            onInit: function () {
               this.oRouter = this.getOwnerComponent().getRouter();
               this.getOwnerComponent().getRouter().getRoute("RouteMaster").attachPatternMatched(this._onMasterMatch, this); 
            },

            _onMasterMatch: function () {
                
            },

            onNavigate: function(oEvent){
               const oItem = oEvent.getParameter("listItem");
            
                this.oRouter.navTo("Detail", {
                    genreId: oItem.getBindingContext().getObject().ID,
                    layout: "TwoColumnsMidExpanded"
                });
            },

            onSearch: function (oEvent) {
                let oTableSearchState = [],
                    sQuery = oEvent.getParameter("query");
                if (sQuery && sQuery.length > 0) {
                    oTableSearchState = [new Filter("GenreName", FilterOperator.Contains, sQuery)];
                }

                this.getView().byId("movieTable").getBinding("items").filter(oTableSearchState, "Application");
            },

            onAdd: function(){
              if (!this.oDefaultDialog) {
				this.oDefaultDialog = new Dialog({
					    title: "New Genre",
					    content: new Input({
                        placeholder: "Enter Genre Name",
                        liveChange: function(oEvent) {
                        const sValue = oEvent.getParameter("value");
                        this._sNewGenreName = sValue.trim();
                }.bind(this)
            }),
					beginButton: new Button({
						text: "OK",
						press: this.Press.bind(this)
					}),
					endButton: new Button({
						text: "Close",
						press: function () {
							this.oDefaultDialog.close();
						}.bind(this)
					})
				});

				this.getView().addDependent(this.oDefaultDialog);
			}
			this.oDefaultDialog.open();
            },

            Press: function(){
                const oList = this.byId("movieTable")
				const oBinding = oList.getBinding("items")
				oBinding.create({
					"GenreName" : this._sNewGenreName,
				})
                this.oDefaultDialog.close();
            },

            onSort: function () {
                this._bDescendingSort = !this._bDescendingSort;
                let oView = this.getView(),
                    oTable = oView.byId("movieTable"),
                    oBinding = oTable.getBinding("items"),
                    oSorter = new Sorter("GenreName", this._bDescendingSort);

                oBinding.sort(oSorter);
            }
        });
    });