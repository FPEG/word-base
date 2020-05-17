pipeline {
    agent any
    stages {
        stage('build') {
            agent {
                    dockerfile  {
                        filename 'Dockerfile'
                        dir 'public'
                        args """
-e MYPROXY_HOST="${env.MYPROXY_HOST}"
-e MYPROXY_PORT="${env.MYPROXY_PORT}"
"""
                    }
                }
            steps {
                script{
                    if(env.MYPROXY_HOST != null){
                        sh "yarn config set proxy http://${env.MYPROXY_HOST}:${env.MYPROXY_PORT}"
                        sh "yarn config set https-proxy http://${env.MYPROXY_HOST}:${env.MYPROXY_PORT}"
                    }
                }
                sh 'yarn install'
				sh 'yarn cibuildtest'
                sh 'rm -rf /opt/nginx/www/WordBase/static'
                sh 'rm -rf /opt/nginx/www/WordBase/index.html'
                sh 'cp -r build/static /opt/nginx/www/WordBase/static'
                sh 'cp -r build/index.html /opt/nginx/www/WordBase/index.html'
            }
        }
    }
}