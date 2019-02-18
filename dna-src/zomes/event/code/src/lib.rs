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
    hash::HashString,
    cas::content::Address,
    json::{JsonString},
    error::HolochainError,
};

mod anchor;
mod message;
mod event;
mod member;
mod utils;

define_zome! {

	entries: [
		message::message_definition(),
    	event::public_event_definition(),
        member::profile_definition(),
        anchor::anchor_definition()
	]

    genesis: || {
        {
    		Ok(())
        }
    }

	functions: [
		register: {
			inputs: | name: String, avatar_url: String |,
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
	        	get_messages
	        ]
	}
 }


