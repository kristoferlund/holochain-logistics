# Logistics

**🤖 This repo is not updated to support holochain beyond version v0.0.4-alpha**

![screendump](https://user-images.githubusercontent.com/9698363/54288144-3d313200-45a7-11e9-84e2-71e6cee007ef.png)

## Introduction

This repo has been created during the Feb 2019 Holochain Devcamp and is based on the [Playground](https://github.com/holochain/dev-camp-playground) repo which is why the zome is named Event.

The intention for creating this repo was that we wanted to create a very minimal but functional little demo of Holochain could be a tool in the context we are working in. The specific funtion that we are trying create the demo for is a way for buyers' clubs, cooperatives that purchase and manage food for it's members, to make surplus available to other buyers' clubs. We would like to see these cooperatives become 2-way nodes in local food networks instead of acting solely as purchasers of goods and helping it get to their members.

We are thinking and designing ways for us to facilitate the growth and interconnection of these entities where we are as well as how to make them more functional internally. There are lots of ways to go with this and we are currenly exploring where we would like to put our effort. This little demo felt like a good way to be able to show an idea of collaboration without consolidation, as well as providing a discussion starter with other groups that are working on collaborative food systems.

## Progress thus far

So where we are at with this demo is that we have adapted the backend to the entry types that we needed, so far these types are:

- Product (Specifying products that )
- Organisation (simply implemented by using the member entry that was already implemented in playground)
- Inventory (combination of a product and an organisation, with a quantity to indicate amount in stock)
- Order (the entry that indicates that one organisation wants products from another one, has space also for updating the entry to indicate that the product has been shipped as well as recieved.)

In the UI we have the ability to create products, list them and view them individually, when the update function works we are also showing the metadata history for a product in the individual product view.

There most functionality for the most basic version of the demo is in place (not signing the orders) on the Holochain back-end but we have a fair bit of work to do on the front even to do our small functionality demo.

## Run

### Multi agent

➤ Install holochain networking component n3h, version `n3h-0.0.6-alpha1`:

- Follow instructions at [https://github.com/holochain/n3h](https://github.com/holochain/n3h).
- Set absoulute path to n3h (`n3h_path`) in both conductor config files - `agent1-conductor-config.toml` and `agent2-conductor-config.toml`.

➤ Install ui dependencies `cd ui-src && yarn install && cd ..`

➤ Run Agent 1 `start:agent1` (password: qwe123)

Open it on http://localhost:8800

➤ Setup second node to connect to first node:

- Copy URI from node 1 CLI output, line starting with starting with: `(@hackmode@) [i] p2p bound`
- URI has format `wss://192.168.1.4:52692/?a=hkao8rlz…`
- Edit `agent2-conductor-config.toml`, set `bootstrap_nodes` to copied URI.
- `bootstrap_nodes` should look like this `["wss://192.168.1.4:59769/?a=hkb1Z08I…"]`

➤ Run Agent 2 `start:agent2` (password: qwe123)

Open it on http://localhost:8801

### Development

CLI1: `yarn start:dev-hc`

CLI2: `yarn start:dev-ui`

### Test

```
cd dna-src/test
hc test
```

## Built With

- [Holochain](https://developer.holochain.org/)
- [React](https://reactjs.org/)

## Authors

- **Kristofer Lund** - [kristoferlund](https://github.com/kristoferlund)
- **Viktor Zaunders** - [zaunders](https://github.com/zaunders)

With initial work from:

- **Willem Olding** - [willemolding](https://github.com/willemolding)
- **Connor Turland** - [Connoropolous](https://github.com/Connoropolous)

## License

This project is licensed under the GPL-3 License - see the [LICENSE.md](LICENSE.md) file for details
