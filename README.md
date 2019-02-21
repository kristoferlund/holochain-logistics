# Logistics

**WORK IN PROGRESS**

## Introduction
This repo has been created during the Feb 2019 Holochain Devcamp and is based on the [Playground](https://github.com/holochain/dev-camp-playground) repo which is why the zome is named Event.

The intention for creating this repo was that we wanted to create a very minimal but functional little demo of Holochain could be a tool in the context we are working in. The specific funtion that we are trying create the demo for is a way for buyers' clubs, cooperatives that purchase and manage food for it's members, to make surplus available to other buyers' clubs. We would like to see these cooperatives become 2-way nodes in local food networks instead of acting solely as purchasers of goods and helping it get to their members.

We are thinking and designing ways for us to facilitate the growth and interconnection of these entities where we are as well as how to make them more functional internally. There are lots of ways to go with this and we are currenly exploring where we would like to put our effort. This little demo felt like a good way to be able to show an idea of collaboration without consolidation, as well as providing a discussion starter with other groups that are working on collaborative food systems.

## Progress thus far
So where we are at with this demo is that we have adapted the backend to the entry types that we needed, so far these types are:
* Product (Specifying products that ) 
* Organisation (simply implemented by using the member entry that was already implemented in playground)
* Inventory (combination of a product and an organisation, with a quantity to indicate amount in stock)
* Order (the entry that indicates that one organisation wants products from another one, has space also for updating the entry to indicate that the product has been shipped as well as recieved.)

In the UI we have the ability to create products, list them and view them individually, when the update function works we are also showing the metadata history for a product in the individual product view.

There most functionality for the most basic version of the demo is in place (not signing the orders) on the Holochain back-end but we have a fair bit of work to do on the front even to do our small functionality demo.


### Test

```
cd dna-src/test
hc test
```

### Holochain DNA

Building the DNA also requires that the holochain developer CLI, `hc`, is installed. Once you have `hc` installed, you can run the helper script

```
**In root folder run:**
npm run hc:build
npm run hc:start
```

### UI

```
cd ui-src
yarn
npm start
```


## Built With

* [Holochain](https://developer.holochain.org/)
* [React](https://reactjs.org/)

A huge acknowledgement to Pusher for providing an open source React event UI (https://github.com/pusher/react-slack-clone)

## Authors

* **Willem Olding** - *Initial work* - [willemolding](https://github.com/willemolding)
* **Connor Turland** - [Connoropolous](https://github.com/Connoropolous)

Adapted by:
* **Kristofer Lund** - [kristoferlund](https://github.com/kristoferlund)
* **Viktor Zaunders** - [zaunders](https://github.com/zaunders)


## License

This project is licensed under the GPL-3 License - see the [LICENSE.md](LICENSE.md) file for details

