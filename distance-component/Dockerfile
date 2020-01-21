FROM maven:3.5-jdk-8
COPY pom.xml /tmp/
COPY src /tmp/src
WORKDIR /tmp
RUN mvn package
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/tmp/target/distance-calculation-service-0.0.1-SNAPSHOT.jar"]