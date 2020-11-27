pipeline {
    agent none
    stages {
        stage('build and package webapi') {
            agent any
            steps {
                dir('webapi') {
                    sh "docker build --no-cache -t webapi:${env.BRANCH_NAME}-${currentBuild.number} ."
                }
            }
        }
        stage('build and package webapp') {
            agent any
            steps {
                dir('webapp') {
                    sh "docker build --no-cache -t webapp:${env.BRANCH_NAME}-${currentBuild.number} ."
                }
            }
        }
        stage('deploy') {
            agent any
            when {
                expression { env.BRANCH_NAME == 'main' }
            }
            steps {
                sh "docker stop webapi || true"
                sh "docker run --rm -d -p 3000:3000 --name webapi webapi:${env.BRANCH_NAME}-${currentBuild.number}"
                sh "docker stop webapp || true"
                sh "docker run --rm -d -p 5000:5000 --name webapp webapp:${env.BRANCH_NAME}-${currentBuild.number}"
            }
        }
    }
}
