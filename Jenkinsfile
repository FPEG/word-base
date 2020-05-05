pipeline {
    agent any
    stages {
        stage('build') {
            agent {
                    dockerfile  {
                        filename 'Dockerfile'
                        dir 'build'
                    }
                }
            steps {
                sh 'yarn --version'
                sh 'npm install'
				sh 'npm run-script build'
                sh 'rm -rf /opt/nginx/www/WordBase/static'
                sh 'rm -rf /opt/nginx/www/WordBase/index.html'
                sh 'cp -r build/static /opt/nginx/www/WordBase/static'
                sh 'cp -r build/index.html /opt/nginx/www/WordBase/index.html'
            }
        }
    }
}