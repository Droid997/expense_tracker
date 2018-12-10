sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/ui/model/json/JSONModel"
],function (Controller,JSONModel) {
   "use strict";
   return Controller.extend("Controller.customer", {
	   onInit : function () {
		   var oController=this;
		   var input_name= new sap.m.Input("id_name",{});
		   var Dialog = new sap.m.Dialog("newDialog",{
					title: 'Add Client',
					content: [new sap.m.Text({text:"Name"}),input_name,new sap.m.Button({width:"100%",text:"Add",
					press:function(){
						
						oController.onAdd();
						
					}})],
					beginButton: new sap.m.Button({
						text: 'Close',
						press: function () {
							oController.onCancel();
						}.bind(this)
					})
				});
      },
	  onTableItemPress:function(oEvent)
	  {
		var path=oEvent.getParameter("listItem").getBindingContextPath("clientsList");
		var Data=oEvent.getParameter("listItem").getModel("clientsList").getProperty(path);
		
		$.post("php/getExpenseList.php",
			{
				client_id: Data.client_id
			},
			function(data){
				var temp_data=JSON.parse(data);
				temp_data["id"]=Data.client_id;
				var oModel=new sap.ui.model.json.JSONModel(temp_data);
				sap.ui.getCore().setModel(oModel,"expenseList");
				
				var page=sap.ui.getCore().byId("app").getPages()[1];
				sap.ui.getCore().byId("app").to(page) 
			});	
			
		
		  
	  },
	  addClient:function(oEvent)
	  {
		  var oController=this;
		  sap.ui.getCore().byId("newDialog").open();
		
	  },
	  onAdd:function()
	  {
		 var oController=this;
		var name=sap.ui.getCore().byId("id_name").getValue();
		if(name!="" && name!=undefined)
		{
			$.post("php/addClient.php",
			{
				name: name
			},
			function(data){
					
				var clientsController=sap.ui.controller("controllers.clients");
				clientsController.getClientList();
				oController.onCancel();
			});	
		}else
		{
			sap.m.MessageToast.show("Enter Proper Name");	
		}
	  },
	  onCancel:function()
	  {
		sap.ui.getCore().byId("newDialog").close();
	  },
	  getClientList()
	  {
		  var clientsList=new sap.ui.model.json.JSONModel({});
		$.ajax({                                      
			  url: 'php/getClients.php',                  
			  async:false,        
			  success: function(data)          
			  {
				  
				clientsList.setData(JSON.parse(data));
				sap.ui.getCore().setModel(clientsList,"clientsList");
				sap.ui.getCore().getModel("clientsList").refresh();
			  },
			  error: function(err)
			  {
				console.log(err);
			  }
			});
	  },
	   intiDB()
	  {
		 var oController=this;
		$.ajax({                                      
			  url: 'php/initDB.php',                  
			  async:false,        
			  success: function(data)          
			  {
				 oController.getClientList();
			  },
			  error: function(err)
			  {console.log(err);}
			});
	  }
	  
      });
      });