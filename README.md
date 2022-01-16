# Signature-Service

*** NOTE: the default wallet address is: 0x0bC3c9A6955eA07833Dc627c2E1E5bcb62366531 attached with the private key in ./config/config.json file. This account is only used for testing. Please change with your own account when deploy on production.

## Endpoints

### 1. Sign Payment:
Returns the signature and associated information such as: message, message hash, v, r, s.

```
POST: /sign-payment

Parameters: 
|  NAME         |    TYPE.      |   EXAMPLE. 
| ------------- | ------------- |-------------         
| amount        | Number        | 2000                     
| nonce         | Number        | 2          
| recipient     | String        | "0xB24aBBb71f5A02c2eaE5e98f071530642246c232"   
| address       | String        | "0x8c51b802E75A509FDea999c7d159C8dD33841eDa"  

* Note: the address field is the ReceiverPays deployed contract address.

Demo request:
{
    "recipient": "0xB24aBBb71f5A02c2eaE5e98f071530642246c232",
    "amount": 1000,
    "nonce": 1,
    "address": "0x8c51b802E75A509FDea999c7d159C8dD33841eDa"
}

Response:
{
    "status": "success",
    "signature": {
        "message": "hihihoho0x8120a42d00609af16d087d877e3bb3157702e6569ef27b35d04839601bb0fcc0",
        "messageHash": "0x1b775a4087b50e141e999bf6a1981b9191c519f6e17b1ce1efb0b1a009180e83",
        "v": "0x1b",
        "r": "0x50d15e8d43c3fe62c2560b654cd2afa3aa6369f7dff51c88f788766a00ddf89a",
        "s": "0x4e871544dc8af947ce09697ac2208f71189cddaa7a443c334ebb4e866cb4abb1",
        "signature": "0x50d15e8d43c3fe62c2560b654cd2afa3aa6369f7dff51c88f788766a00ddf89a4e871544dc8af947ce09697ac2208f71189cddaa7a443c334ebb4e866cb4abb11b"
    }
}
```

### 2. Get signature:
Returns the signature from the parameters such as: amount, nonce, timestamp.
```
POST: /get-signature

Parameters: 
|  NAME         |    TYPE.      |   EXAMPLE. 
| ------------- | ------------- |-------------         
| amount        | Number        | 2000                     
| nonce         | Number        | 2          
| timestamp     | Number        | 1641910681   

Demo request: 
{
    "user_address": "0xB24aBBb71f5A02c2eaE5e98f071530642246c239",
    "amount": 1000,
    "nonce": 2,
    "timestamp": 1641907458
}

Response:
{
    "status": "success",
    "signature": "0x8703036d18a1f181efbdd8974623164749dfd9de5afd5e563325ccfb5dee18101de1dcb12c500204e3fea8970d4799d9462ede46fcd1bc063b7d28870deca8d51c"
}
      
```

### 3. Verify Signature
Verify the signature is authentic or not

```
POST: /verify-signature

Parameters: 
|  NAME         |    TYPE.      |   EXAMPLE. 
| ------------- | ------------- |-------------         
| message        | String        | "hihihoho0x8120a42d00609af16d087d877e3bb3157702e6569ef27b35d04839601bb0fcc0"                     
| signature      | String        | "0x50d15e8d43c3fe62c2560b654cd2afa3aa6369f7dff51c88f788766a00ddf89a4e871544dc8af947ce09697ac2208f71189cddaa7a443c334ebb4e866cb4abb11b"          


Demo request: 
{

        "message": "hihihoho0x8120a42d00609af16d087d877e3bb3157702e6569ef27b35d04839601bb0fcc0",
        "signature": "0x50d15e8d43c3fe62c2560b654cd2afa3aa6369f7dff51c88f788766a00ddf89a4e871544dc8af947ce09697ac2208f71189cddaa7a443c334ebb4e866cb4abb11b"
}

Response:
{
    "status": "success",
    "isVerified": true
}

```