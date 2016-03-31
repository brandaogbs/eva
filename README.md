# EVA Project
> **Simples Automação via Serial com Arduino**

>Controle e automação de equipamentos de alta tensão como lampadas, ventiladores e cafeteiras a partir da internet, possibilitando assim utilizar qualquer equipamento com conexão a rede como smartphones, tablets e pcs como controle.
Tentou-se manter o mais simples e elegante, não fazendo uso de shields ou modulos para comunicação no arduino, apenas a comunicação serial (USB) arduino-pc.

# Instalation
>Utilizarei como exemplo o procedimento no Ubuntu.

1. Obter o Apache e o PHP,

	sudo apt-get install apache2
	sudo apt-get install libapache2-mod-php
	sudo a2enmod php5

2. Download do [Projeto](https://github.com/brandaogbs/eva).

3. Mova para o `/var/www/html`. Caso seja necessário ter permissão:

	sudo chown <usuario> /var/www/html

4. Configurar a certificação SSL:

>Ativar módulo SSL

	sudo a2enmod ssl
	sudo service apache2 restart

>Criar um Self-Signed SSL Certificate, complete os campos com dados qualquer

	sudo mkdir /etc/apache2/ssl
	sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/apache2/ssl/apache.key -out /etc/apache2/ssl/apache.crt

>Ativar o SSL Virtual Host

	sudo a2ensite default-ssl.conf
	sudo service apache2 restart



# Getting Started

1. automation/arduino 	: contem os sketch que deve ser gravado no arduino
5. automation/css	 		: arquivos css das paginas
4. automation/index.php 	: menu principal
6. automation/js		 	: arquivos javascript das paginas

# Examples

	nothing, yet ):

# Necessary Hardware

	nothing, yet ):
