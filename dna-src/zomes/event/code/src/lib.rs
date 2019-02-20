#![feature(try_from)]
#[macro_use]
extern crate hdk;
extern crate serde;
#[macro_use]
extern crate serde_derive;
extern crate serde_json;
#[macro_use]
extern crate holochain_core_types_derive;
use hdk::{
    error::ZomeApiResult,
};

use hdk::holochain_core_types::{
    entry::Entry,
    hash::HashString,
    cas::content::Address,
    json::{JsonString},
    error::HolochainError,
};

use holochain_wasm_utils::api_serialization::{
    get_entry::EntryHistory
};

mod anchor;
mod message;
mod event;
mod member;
mod utils;
mod product;
mod inventory;

define_zome! {

	entries: [
		message::message_definition(),
    	event::public_event_definition(),
        member::profile_definition(),
        anchor::anchor_definition(),
		product::product_definition(),
		inventory::inventory_definition()
	]

    genesis: || {
        {
    		Ok(())
        }
    }

	functions: [
		register: {
			inputs: | name: String, avatar_url: String, description: String |,
			outputs: |result: ZomeApiResult<Address>|,
			handler: member::handlers::handle_register
		}
		create_event: {
			inputs: |name: String, description: String, initial_members: Vec<Address>|,
			outputs: |result: ZomeApiResult<Address>|,
			handler: event::handlers::handle_create_event
		}
		join_event: {
		    inputs: |event_address: HashString|,
		    outputs: |result: ZomeApiResult<()>|,
		    handler: event::handlers::handle_join_event
		}
		get_all_public_events: {
			inputs: | |,
			outputs: |result: ZomeApiResult<utils::GetLinksLoadResult<event::Event>>|,
			handler: event::handlers::handle_get_all_public_events
		}
		get_members: {
			inputs: |event_address: HashString|,
			outputs: |result: ZomeApiResult<Vec<Address>>|,
			handler: event::handlers::handle_get_members
		}
		get_member_profile: {
			inputs: |agent_address: HashString|,
			outputs: |result: ZomeApiResult<member::Profile>|,
			handler: member::handlers::handle_get_member_profile			
		}
		get_my_member_profile: {
			inputs: | |,
			outputs: |result: ZomeApiResult<member::Profile>|,
			handler: member::handlers::handle_get_my_member_profile			
		}
		post_message: {
			inputs: |event_address: HashString, message: message::MessageSpec|,
			outputs: |result: ZomeApiResult<()>|,
			handler: event::handlers::handle_post_message
		}
		get_messages: {
			inputs: |address: HashString|,
			outputs: |result: ZomeApiResult<utils::GetLinksLoadResult<message::Message>>|,
			handler: event::handlers::handle_get_messages
		}
		//
		//  PRODUCTS
		//
		create_product: {
			inputs: |name: String, description: String, image_url: String, price: u32|,			    
			outputs: |result: ZomeApiResult<Address>|,
			handler: product::handlers::handle_create_product
		}
		update_product: {
			inputs: |product_address: Address, name: String, description: String, image_url: String, price: u32|,			    
			outputs: |result: ZomeApiResult<Address>|,
			handler: product::handlers::handle_update_product
		}
		get_all_products: {
				inputs: | |,
				outputs: |result: ZomeApiResult<utils::GetLinksLoadResult<product::Product>>|,
				handler: product::handlers::handle_get_all_products
		}
		//
		//  INVENTORY
		//
		create_inventory: {
				inputs: |product_address: HashString, org_address: HashString, stocked_units: u32|,			    
				outputs: |result: ZomeApiResult<Address>|,
				handler: inventory::handlers::handle_create_inventory
        }
		//
		//  UTIL
		//
		get_entry_history: {
				inputs: |entry_address: HashString|,			    
				outputs: |result: ZomeApiResult<EntryHistory>|,
				handler: utils::handle_get_entry_history
        }
		get_entry: {
				inputs: |entry_address: HashString|,			    
				outputs: |result: ZomeApiResult<Entry>|,
				handler: utils::handle_get_entry
        }
	]

	 traits: {
	        hc_public [
	        	register,
	        	create_event,
	        	join_event,
	        	get_all_public_events,
	        	get_members,
	        	get_member_profile,
	        	get_my_member_profile,
	        	post_message,
	        	get_messages,
    			create_product,
    			update_product,
    			get_all_products,
     			create_inventory,
				get_entry_history,
				get_entry
	        ]
	}
 }


