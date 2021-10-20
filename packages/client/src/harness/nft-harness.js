import "../components/page-panel.js";
import "../components/page-body.js";
import "../components/action-card.js";
import "../components/account-widget.js";
import "../components/text-widget.js";
import "../components/number-widget.js";
import "../components/switch-widget.js";

import DappLib from "@decentology/dappstarter-dapplib";
import { LitElement, html, customElement, property } from "lit-element";

@customElement('nft-harness')
export default class NftHarness extends LitElement {
  @property()
  title;
  @property()
  category;
  @property()
  description;

  createRenderRoot() {
    return this;
  }

  constructor(args) {
    super(args);
  }

  render() {
    let content = html`
      <page-body title="${this.title}" category="${this.category}" description="${this.description}">
      
        <!-- Registry -->
      
        <action-card title="(As hospital) Registry - Register" description="Register a Tenant with the RegistryService to get an AuthNFT"
          action="registerRegistry" method="post" fields="acct">
          <account-widget field="acct" label="Account">
          </account-widget>
        </action-card>
      
        <action-card title="(As hospital) NFT - Get NFT Tenant"
          description="Get an instance of a Tenant from RegistryNFTContract to have your own data" action="nftTenant"
          method="post" fields="acct">
          <account-widget field="acct" label="Account">
          </account-widget>
        </action-card>
      
        <!-- NFT -->
      
        <action-card title="(As hospital/pharma) NFT - Provision Account" description="Set up a user account to handle NFTs"
          action="provisionAccountNFT" method="post" fields="acct">
          <account-widget field="acct" label="Account">
          </account-widget>
        </action-card>
      
        <action-card title="(As hospital) NFT - Mint NFT" description="Mint an NFT into an account using the Tenant's data" action="mintNFT"
          method="post" fields="acct dataowner nftName">
          <account-widget field="acct" label="Tenant Account">
          </account-widget>
          <account-widget field="dataowner" label="Data Owner Account">
          </account-widget>
          <text-widget field="nftName" label="Name of NFT" placeholder="Jacob Rocks"></text-widget>
        </action-card>

<!--       
        <action-card title="NFT - Transfer NFT" description="Transfer an NFT from Giver -- Recipient" action="transferNFT"
          method="post" fields="giver recipient id">
          <account-widget field="giver" label="Giver">
          </account-widget>
          <account-widget field="recipient" label="Recipient">
          </account-widget>
          <text-widget field="id" label="ID" placeholder="0"></text-widget>
        </action-card> -->
      
        <action-card title="(As hospital/pharma) NFT - Get Owned NFTs" description="Get Owned NFTs" action="getNFTsInCollection" method="get"
          fields="acct">
          <account-widget field="acct" label="Account">
          </account-widget>
        </action-card>
      
        <action-card title="(As hospital/pharma) NFT - Get NFT Metadata" description="Get NFT Metadata" action="getNFTMetadata" method="get"
          fields="acct id">
          <account-widget field="acct" label="Account">
          </account-widget>
          <text-widget field="id" label="ID" placeholder="0"> </text-widget>
        </action-card>
      
        <!-- Market -->
      
        <action-card title="(As hospital) Marketplace - Provision Account" description="Set up an account to have a SaleCollection"
          action="provisionAccountMarketplace" method="post" fields="acct">
          <account-widget field="acct" label="Account">
          </account-widget>
        </action-card>
      
        <action-card title="(As hospital) Marketplace - List NFT for sale" description="List NFT for sale. Price must be of type double."
          action="listNFTForSale" method="post" fields="acct id price">
          <account-widget field="acct" label="Marketplace Account">
          </account-widget>
          <text-widget field="id" label="ID" placeholder="0">
          </text-widget>
          <text-widget field="price" label="Price" placeholder="100.0">
          </text-widget>
        </action-card>
      
        <action-card title="(As pharma) Marketplace - Buy NFT" description="Buy an NFT from marketplace account" action="buyNFT"
          method="post" fields="marketplaceAcct dataownerAcct buyer id">
          <account-widget field="marketplaceAcct" label="Marketplace Account">
          </account-widget>
          <account-widget field="dataownerAcct" label="Patient (Data Owner) Account">
          </account-widget>
          <account-widget field="buyer" label="Buyer Account">
          </account-widget>
          <text-widget field="id" label="NFT ID" placeholder="0">
          </text-widget>
        </action-card>
      
        <!-- Flow Token -->
        <action-card title="(As hospital/pharma) Get Balance" description="Get the Flow Token balance of an account" action="getBalance"
          method="get" fields="account">
          <account-widget field="account" label="Account">
          </account-widget>
        </action-card>
      
      
      </page-body>
      <page-panel id="resultPanel"></page-panel>
    `;

    return content;
  }
}
