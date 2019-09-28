/* eslint-disable no-undef */
import {JetView} from "webix-jet";
import {data} from "models/records";

export default class DataView extends JetView{
	config(){
		return {
			view: "layout",
			rows: [
				{
					rows: [
						{
							view:"template",
							height: 60,
							template: () => {
								return `<div>
											<h2> Add Film </h2>
										</div>`;
							}
						},
						{
							view: "form",
							id: "film-form",
							gravity: 2,
							rows: [
								{ view:"text", name:"title", id:"inp_title", label:"Title", },
								{ view:"text", name:"year", id:"inp_year", label:"Year" },
								{ view:"text", name:"votes", id:"inp_votes", label:"Votes" },
								{ view:"text", name:"rating", id:"inp_rating", label:"Rating" },
								{ view:"text", name:"rank", id:"inp_rank", label:"Rank" },
								{
									view:"button",
									name:"save",
									value: "Save",
									$css:{ "background-color" : "#f1c40f", "color" : "white" },
									click: function() {
										const filmForm = $$("film-form");
										const values = filmForm.getValues();
										$$("table").add(values);
									}},
							]
						},
					]
				},
				{view:"resizer"},
				{
					id: "table",
					view:"datatable",
					columns: [
						{ id: "title", editor:"text", header:"Title", width: 500 },
						{ id: "year", editor:"text", header:"Year" },
						{ id: "votes", editor:"text", header:"Votes" },
						{ id: "rating", editor:"text", header:"Rating" },
						{ id: "rank", editor:"text", header:"Rank" },
						{ id: "action", header: "Action", template: () => {
							return `<div style="padding: 2px">
										<button class="delete_button"> Delete </button>									
									</div>`;
						}}
					],
					select: true,
					autoWidth: true,
					editable:true,
					onClick: {
						delete_button: function () {
							// Somehow when click on button inside datatable
							// button clicked first after that the selected rows state for datatable changed
							// so this is a quick hack for handle that case LoL
							setTimeout(()=> {
								this.remove(this.getSelectedId());
							},20);

						},
					}
				}
			]
		};
	}
	init(){
		$$("table").parse(data);
	}
}