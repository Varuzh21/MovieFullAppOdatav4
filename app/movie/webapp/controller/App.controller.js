sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/model/json/JSONModel"
    ],
    function(BaseController, JSONModel) {
      "use strict";
  
      return BaseController.extend("com.movie.controller.App", {
        onInit: function() {
          const model = new JSONModel({
          layout: "OneColumn",
          actionButtonsInfo: {
            midColumn: {
              fullScreen: false
            },
            endColumn:{
              fullScreen: false
            }
          },
        });
        this.getView().setModel(model, "AppView");
        }
      });
    }
  );
  