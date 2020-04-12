### Docker container
#### Build
docker build -t atalavera/iot-humidity-module .

#### Run
docker run -p 8080:8080 --network iot-app atalavera/iot-humidity-module

#### Stop
docker kill [container_id]

### RabbitMQ
docker run -it --rm --network iot-app --hostname rabbitmqhost --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
