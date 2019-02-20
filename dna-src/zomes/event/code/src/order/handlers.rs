
use hdk::error::ZomeApiResult;
use hdk::holochain_core_types::{
    entry::Entry,
    cas::content::Address,
    json::RawString,
};

use crate::order::{
    Order,
};

use crate::utils;

pub fn handle_create_order(
    supply_organisation: Address,
    recieving_organisation: Address,
    product_address: Address,
    order_quantity: u32,
    transport: String,
    comment: String,
    is_sent: bool,
    is_recieved: bool
) -> ZomeApiResult<Address> {

    let order = Order{supply_organisation, recieving_organisation, product_address, order_quantity, transport, comment, is_sent, is_recieved};

    let entry = Entry::App(
        "order".into(),
        order.into()
    );

    let order_address = hdk::commit_entry(&entry)?;

    let anchor_entry = Entry::App(
        "anchor".into(),
        RawString::from("global_order_list").into(),
    );

    let anchor_address = hdk::commit_entry(&anchor_entry)?;
    hdk::link_entries(&anchor_address, &order_address, "order_link")?;

    Ok(order_address)
}

pub fn handle_get_all_orders() -> ZomeApiResult<utils::GetLinksLoadResult<Order>> {
    let anchor_entry = Entry::App(
        "anchor".into(),
        RawString::from("global_order_list").into(),
    );
    let anchor_address = hdk::entry_address(&anchor_entry)?;

    utils::get_links_and_load_type(&anchor_address, "order_link")
}
