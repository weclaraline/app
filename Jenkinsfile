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
    }
}
