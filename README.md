# Signature-Service

## Endpoints

### 1. Get signature:
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

### 2. Recover Signer:
Recover signer address from the given message and signature.

```
POST: /recover-signer

Parameters: 
|  NAME         |    TYPE.      |   EXAMPLE. 
| ------------- | ------------- |-------------         
| message        | String        | "1641908460"                     
| signature      | String        | "0x8703036d18a1f181efbdd8974623164749dfd9de5afd5e563325ccfb5dee18101de1dcb12c500204e3fea8970d4799d9462ede46fcd1bc063b7d28870deca8d51c"          


Demo request: 
{
    "message": "1641908460",
    "signature": "0x8703036d18a1f181efbdd8974623164749dfd9de5afd5e563325ccfb5dee18101de1dcb12c500204e3fea8970d4799d9462ede46fcd1bc063b7d28870deca8d51c"
}

Response:
{
    "status": "success",
    "signer": "0x0bC3c9A6955eA07833Dc627c2E1E5bcb62366531"
}