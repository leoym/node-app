http://localhost:3000/reports/add?device=monitor01&temp-22&umid=55&sensor=off

GET _search
{
  "query": {
    "match_all": {}
  }
}

# index a doc
PUT reports/track/003
{
  "data": "10/10/2018" , "acao": "acao"
}

# and get it ...
GET reports/track/001

GET reports/track/_search
{
  "query": {
    "match_all": {}
  }
}

