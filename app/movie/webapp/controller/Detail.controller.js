sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/f/library",
    "sap/ui/core/Fragment",
    "sap/m/MessageBox",
  ],
  function (Controller, Filter, FilterOperator, fLibrary, Fragment, MessageBox) {
    "use strict";
    
    return Controller.extend("com.movie.controller.Detail", {
      onInit: function () {
        this.oRouter = this.getOwnerComponent().getRouter();
        this.getOwnerComponent().getRouter().getRoute("Detail").attachPatternMatched(this._onDetailMatch, this);
        this.getOwnerComponent().getRouter().getRoute("DetailDetail").attachPatternMatched(this._onDetailMatch, this);
      },

      _onDetailMatch: function (oEvent) {
        this.genreId = oEvent.getParameter("arguments").genreId;
        this.layout = oEvent.getParameter("arguments").layout || fLibrary.LayoutType.TwoColumnsMidExpanded;
        this.getView().getModel("AppView").setProperty("/layout", this.layout);
        this.bindListItems();
      },

      bindListItems: function () {
        const list = this.getView().byId("detailTable");
        const template = list.getBindingInfo("items").template;
        list.bindItems({
          path: "/Movies",
          template: template,
          filters: [new Filter("genre_ID", FilterOperator.EQ, this.genreId)]
        });
      },

      onNavigate: function(oEvent) {
        const oItem = oEvent.getParameter("listItem")
        
        this.oRouter.navTo("DetailDetail",{
           genreId: this.genreId,
           movieId: oItem.getBindingContext().getObject().ID,
           layout: "ThreeColumnsMidExpanded"
        })
      },

      onAdd: function(){
        if (!this._oFragment) {
        this._oFragment = Fragment.load({
            id: this.getView().getId(),
            name: "com.movie.movie.view.Add",
            controller: this,
        }).then(function(oFragment) {
            this._oFragment = oFragment;
            this._oFragment.setModel(this.getView().getModel());
            this.newPendingChanges();
            this.getView().addDependent(oFragment);
            this._oFragment.open();
        }.bind(this))
        } else {
          this._oFragment.open();
        }
      },

      newPendingChanges: function () {
        const form = this.getView().byId('idMovieForm');
        const context = this.getView().getModel().createEntry('/Movies', {
          properties: {
            Title: undefined,
            Description: undefined,
            Images: "images/img.jpg",
            ReleaseDate: undefined,
            genre_ID: this.genreId,
            Rating: undefined
          }
        });
        const path = context.getPath();
        form.bindElement(path);
      },
      
      onCreate: function() {
      if (this.validateData(["movieName", "moavieDescription", "endDateInput", "endDateInput_"])) {
        this.getView().getModel().submitChanges();
        this._oFragment.close()
        this._oFragment.destroy()
        MessageBox.success("Changes saved successfully.");
        this.getView().getModel().refresh();
        }
    },

      validateData: function(idList) {
      const form = this.getView().byId('idMovieForm');
      const context = form.getBindingContext();
      const datat = context.getObject()
    
      if (!datat.Title || !datat.Description || !datat.ReleaseDate || !datat.Rating) {
        idList.forEach(e => {
          const input = this.getView().byId(e);
          input.setValueState(sap.ui.core.ValueState.Error);
          input.setValueStateText(`Please fill in required fields.`);
          input.openValueStateMessage();
        });
        return false; 
      }
      return true; 
    },

    onInputChange: function(oEvent){
      const source = oEvent.getSource()
      const value = oEvent.getParameter("value");
      if(!value){
        return
      }
      source.setValueState("None");
      source.setValueStateText("");
      source.closeValueStateMessage();
    },

      onCancel: function () {
        this._oFragment.close()
      },

       handleFullScreen: function () {
            const sNextLayout = this.getView().getModel("AppView").getProperty("/actionButtonsInfo/midColumn/fullScreen");
            this.getView().getModel("AppView").setProperty("/actionButtonsInfo/midColumn/fullScreen", !sNextLayout);
            !sNextLayout?this.getView().getModel("AppView").setProperty("/layout", "MidColumnFullScreen"):this.getView().getModel("AppView").setProperty("/layout", "TwoColumnsMidExpanded") 
        },
        
        handleClose: function () {
            const oRouter = this.getOwnerComponent().getRouter();
            this.getView().getModel("AppView").setProperty("/layout", "OneColumn")
            oRouter.navTo("Master");
        }
    });
  }
);