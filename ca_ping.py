import socket
import urllib
import urllib2
import time
import atexit
import sys

SERVER_URL = 'http://130.18.123.3/api/computers/'

#if len(sys.argv) < 1:
#  exit("please specify computer name")
#if len(sys.argv) == 3:
computer_name = socket.gethostname()
if len(sys.argv) >= 1:
  comp_name = sys.argv[1]
loop_time = 60
if len(sys.argv) == 3:
  loop_time = int(sys.argv[2])

print "loop time is "+ str(loop_time)
#  loop_time = int(sys.argv[2])

print "loop time is "+ str(loop_time)

def setUnused(comp_name):
    setStatus(comp_name,'free',post_data)

atexit.register(setUnused, comp_name=comp_name)


def setStatus(comp_name, status, post_data):

    request = urllib2.Request(SERVER_URL+status, post_data)
    request.add_header('host','labs.dockerhost')
    try:
      response = urllib2.urlopen(request)
    except Exception as e:
      pass
    print response.read()

print "you should see the correct computer name here", comp_name

while True:
    data = {}
    data['name'] = comp_name
    #data['name'] = comp_name
    print data['name']
    post_data = urllib.urlencode(data)

    setStatus(comp_name,'ping',post_data)

    time.sleep(loop_time)

