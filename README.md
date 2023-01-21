**TEST MODE**

To simulate successful payments from many countries, use test cards from the following sections.

- Use a valid future date, such as 12/34.
- Use any three-digit CVC (four digits for American Express cards).
- Use any value you like for other form fields.

|       COUNTRY      |      NUMBER      | BRAND |
|:------------------:|:----------------:|:-----:|
| United States (US) | 4242424242424242 | Visa  |
|     Brazil (BR)    | 4000000760000002 | Visa  |
|     Canada (CA)    | 4000001240000000 | Visa  |
|     Mexico (MX)    | 4000004840008001 | Visa  |

![test-card c3f9b3d1a3e8caca3c9f4c9c481fd49c](https://user-images.githubusercontent.com/95842645/212977373-f1309789-84d5-40fc-b56d-e8a877d50f59.jpg)

**Declined payments**

To simulate payments that the issuer declines for various reasons, use test cards from this section. This can be useful for testing your integration’s error handling logic.

|         DESCRIPTION        |      NUMBER      |    ERROR CODE    |    DECLINE CODE    |
|:--------------------------:|:----------------:|:----------------:|:------------------:|
| Insufficient funds decline | 4000000000009995 |   card_declined  | insufficient_funds |
|    Expired card decline    | 4000000000000069 | expired_card     |         n/a        |
|    Incorrect CVC decline   | 4000000000000127 |   incorrect_cvc  |         n/a        |
|  Incorrect number decline  | 4242424242424241 | incorrect_number |         n/a        |
