import socket
import urllib
import urllib2
import time
import atexit
import sys

SERVER_URL = 'http://130.18.249.157:1337/computer/'

if len(sys.argv) < 1:
  exit("please specify computer name")
loop_time = 60
if len(sys.argv) == 3:
  loop_time = int(sys.argv[2])

print "loop time is "+ str(loop_time)
comp_name = sys.argv[1]

def setUnused(comp_name):
    request = urllib2.Request(SERVER_URL+"free", post_data)
    response = urllib2.urlopen(request)

    print response.read()

atexit.register(setUnused, comp_name=comp_name)


while True:
    data = {}
    data['name'] = socket.gethostname()
    data['name'] = comp_name
    print data['name']
    post_data = urllib.urlencode(data)

    request = urllib2.Request(SERVER_URL+"ping", post_data)
    response = urllib2.urlopen(request)

    print response.read()
    time.sleep(loop_time)

