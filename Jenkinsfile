pipeline {
    agent any
    stages {
        stage('build') {
            agent {
                    docker {
                        image 'node:alpine'
                    }
                }
            steps {
				sh 'npm build'
            }
        }
    }
}