sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/ui/model/json/JSONModel"
],function (Controller,JSONModel) {
   "use strict";
   return Controller.extend("Controller.addClient", {
	   onInit : function () {
		   var oController=this;
		   var text_title=new sap.m.Text({text:"Title"});
		   var text_currency=new sap.m.Text({text:"Currency"});
		   var text_amount=new sap.m.Text({text:"Amount"});
		   var text_description=new sap.m.Text({text:"Description"});
		   
		    var title= new sap.m.Input("id_title",{});
		    var amount= new sap.m.Input("id_amounr",{type:sap.m.InputType.Number});
			
			var rs=new sap.ui.core.Item({key:"RS",text:"RS"});
			var Dollar=new sap.ui.core.Item({key:"Dollar",text:"Dollar"});
			var Euro=new sap.ui.core.Item({key:"Euro",text:"Euro"});
			var Yen=new sap.ui.core.Item({key:"Yen",text:"Yen"});
			var currency=new sap.m.Select("currency",{width:"100%",items:[rs,Dollar,Euro,Yen]}); 
		    var description= new sap.m.Input("id_description",{});
		   var add_button=new sap.m.Button({text:"Add",
					press:function(){
						
						oController.onAdd();
						
					}});

			var flexBox=new sap.m.FlexBox({justifyContent:sap.m.FlexJustifyContent.Center});
			flexBox.addItem(add_button);

			var vbox=new sap.m.VBox();
			vbox.addItem(text_title);
			vbox.addItem(title);
			vbox.addItem(text_currency);
			vbox.addItem(currency);
			vbox.addItem(text_amount);
			vbox.addItem(amount);
			vbox.addItem(text_description);
			vbox.addItem(description);
			vbox.addItem(flexBox);
			
			
		    var Dialog = new sap.m.Dialog("newExpenseDialog",{
					title: 'Add Expense',
					content: [vbox],
					beginButton: new sap.m.Button({
						text: 'Close',
						press: function () {
							oController.onCancel();
						}.bind(this)
					})
				});
				
      },
	  navBack:function(oEvent)
	  {
		sap.ui.getCore().byId("idApp1--clientsTable").removeSelections();
		var page=sap.ui.getCore().byId("app").getPages()[0];
		sap.ui.getCore().byId("app").back();
	  },
	  addExpense:function()
	  {
		  var oController=this;
		  sap.ui.getCore().byId("newExpenseDialog").open();
	  },
	  onCancel:function()
	  {
		sap.ui.getCore().byId("newExpenseDialog").close();
	  },
	  onAdd:function(oEvent)
	  {
		  var oController=this;
		var title=sap.ui.getCore().byId("id_title").getValue();
		  var currency=sap.ui.getCore().byId("currency").getSelectedKey()
		  var amount=sap.ui.getCore().byId("id_amounr").getValue();
		  var description=sap.ui.getCore().byId("id_description").getValue();
		  var id=sap.ui.getCore().getModel("expenseList").getProperty("/id");
		 
			$.post("php/addExpense.php",
			{
				
				client_id:id,
				title:title,
				amount:amount,
				currency:currency,
				description:description
			},
			function(data){
				oController.onCancel();
				$.post("php/getExpenseList.php",
							{
								client_id: id
							},
							function(data){
								var temp_data=JSON.parse(data);
								temp_data["id"]=id;
								var oModel=new sap.ui.model.json.JSONModel(temp_data);
								sap.ui.getCore().setModel(oModel,"expenseList");
								
							});					
				
			});	
		
		 
	  },
      });
      });