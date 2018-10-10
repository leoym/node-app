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


/usr/local/bin/app

#!/bin/bash -e

cd /opt/app;
nohup node --max-old-space-size=6144 app/bin/www.js > /dev/null 2>&1 &


/etc/systemd/app

/lib/systemd/system/nodejs.service

[Unit]
Description=Node.js App Server
After=syslog.target
After=network.target

[Service]
Type=forking
LimitNOFILE=65535
LimitNPROC=65535
ExecStart=/bin/bash /usr/local/bin/app
EnvironmentFile=/etc/systemd/app

Restart=always
RestartSec=10

#User={{ webstore_user }}
User=java
#Group={{ webstore_user }}
Group=java

# Give a reasonable amount of time for the server to start up/shut down
TimeoutSec=300

[Install]
WantedBy=multi-user.target




#####################
NodeJS + Firebase

https://console.firebase.google.com
https://firebase.google.com/docs/database/rest/retrieve-data
https://firebase.google.com/docs/database/web/read-and-write
https://lym-iot.firebaseio.com/rest/iot-data/education/users.json?print=pretty
https://rpm.newrelic.com

