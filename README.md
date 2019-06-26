# Timeline
## GET /current_value
### Request Parameters:
| Param | Description | Format | Example
| ------ | ------ | ------ | ------ |
| start_date | The initial date to check values | YYYY-MM-DD | 2016-01-01
| initial_balance | The initial balance or investment | number | 32500
| allocation | The assets allocation, must sum 100 | key:value;key:value | AAPL:20;GOOG:50;VTI:30

### Request Example:
https://timeline-challenge.herokuapp.com/current_value?start_date=2016-01-01&initial_balance=32500&allocation=AAPL:20;GOOG:50;VTI:30

### Response Example:
```json
{
    "initial_date": "2019-06-10",
    "initial_balance": "10000.00",
    "assets": [
        {
            "initial": {
                "date": "2019-06-10",
                "value": "192.58",
                "balance": "2000.00"
            },
            "final": {
                "date": "2019-06-24",
                "value": "198.58",
                "balance": "2062.31"
            },
            "symbol": "AAPL",
            "allocation": "20%",
            "variation": "3.12%",
            "earnings": "62.31"
        },
        {
            "initial": {
                "date": "2019-06-10",
                "value": "1080.38",
                "balance": "5000.00"
            },
            "final": {
                "date": "2019-06-24",
                "value": "1115.52",
                "balance": "5162.63"
            },
            "symbol": "GOOG",
            "allocation": "50%",
            "variation": "3.25%",
            "earnings": "162.63"
        },
        {
            "initial": {
                "date": "2019-06-10",
                "value": "147.61",
                "balance": "3000.00"
            },
            "final": {
                "date": "2019-06-24",
                "value": "149.86",
                "balance": "3045.73"
            },
            "symbol": "VTI",
            "allocation": "30%",
            "variation": "1.52%",
            "earnings": "45.73"
        }
    ],
    "final_balance": "10270.67"
}
```

### Pending:
- Unit tests
- Saving queries to database, by user
- More endpoints for retrieving and creating entities in database
- Some code improvements