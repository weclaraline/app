pipeline {
    agent none
    stages {
        stage('build webapi') {
            agent { docker { image 'node:14-alpine' } }
            steps {
                dir('webapi') {
                    sh "npm install"
                }
            }
        }
        stage('build webapp') {
            agent { docker { image 'node:14-alpine' } }
            steps {
                dir('webapp') {
                    sh "npm install"
                    sh "npm run build"
                }
            }
        }
        stage('package webapi') {
            agent any
            steps {
                dir('webapi') {
                    sh "docker build --no-cache -t webapi:${currentBuild.number} ."
                }
            }
        }
        stage('package webapp') {
            agent any
            steps {
                dir('webapp') {
                    sh "docker build --no-cache -t webapp:${currentBuild.number} ."
                }
            }
        }
        stage('deploy') {
            agent any
            steps {
                sh "docker stop webapi"
                sh "docker run --rm -d -p 3000:3000 --name webapi webapi:${currentBuild.number}"
                sh "docker stop webapp"
                sh "docker run --rm -d -p 5000:5000 --name webapp webapp:${currentBuild.number}"
            }
        }
    }
}
