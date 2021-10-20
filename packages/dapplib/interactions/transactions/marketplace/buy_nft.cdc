import FungibleToken from Flow.FungibleToken
import RegistryNFTContract from Registry.RegistryNFTContract
import MarketplaceContract from Project.MarketplaceContract
import NonFungibleToken from Flow.NonFungibleToken
import FlowToken from Flow.FlowToken

// This transaction is used to purchase an NFT from a seller's Collection

transaction(id: UInt64, marketplaceAcct: Address) {

    let saleCollection: &MarketplaceContract.SaleCollection{MarketplaceContract.SalePublic}
    let userVaultRef: &FlowToken.Vault{FungibleToken.Provider}
    let userNFTCollection: &RegistryNFTContract.Collection{NonFungibleToken.Receiver}
    let dataOwner: Address

    prepare(acct: AuthAccount, dataowner: AuthAccount) {
        
        log("acct: ".concat(acct.address.toString()))
        log("dataowner: ".concat(dataowner.address.toString()))
        self.dataOwner = dataowner.address

        self.saleCollection = getAccount(marketplaceAcct).getCapability(/public/SaleCollection)
            .borrow<&MarketplaceContract.SaleCollection{MarketplaceContract.SalePublic}>()
            ?? panic("Could not borrow from the Admin's Sale Collection")

        self.userVaultRef = acct.borrow<&FlowToken.Vault{FungibleToken.Provider}>(from: /storage/flowTokenVault)
            ?? panic("Could not borrow reference to the owner's Vault!")

        self.userNFTCollection = acct.getCapability(/public/NFTCollection)
            .borrow<&RegistryNFTContract.Collection{NonFungibleToken.Receiver}>()
            ?? panic("Could not borrow from the user's NFT Collection")
    }

    execute {
        let cost = self.saleCollection.idPrice(id: id) ?? panic("An NFT with this id is not up for sale")
        log("cost: ".concat(cost.toString()))
        let vault <- self.userVaultRef.withdraw(amount: cost * 0.8)
        log("vault: ".concat(vault.balance.toString()))
        let royalty <- self.userVaultRef.withdraw(amount: cost * 0.2)
        log("royalty: ".concat(royalty.balance.toString()))

        self.saleCollection.purchase(id: id, recipient: self.userNFTCollection, buyTokens: <-vault, royalty: <- royalty, dataOwner: self.dataOwner)
    }
}
