# Simples Automação via Serial com Arduino

Controle e automação de equipamentos de alta tensão como lampadas, ventiladores e cafeteiras a partir da internet, possibilitando assim utilizar qualquer equipamento com conexão a rede como smartphones, tablets e pcs como controle.
Tentou-se manter o mais simples e elegante, não fazendo uso de shields ou modulos para comunicação no arduino, apenas a comunicação serial (USB) arduino-pc.

# Instalation

1. Obter o php, "pacman -S php" ou download (http://php.net/downloads.php)
2. Download (https://github.com/gbuj/automation.git)
3. Iniciar quick-servidor php, "php -S <ip:porta> diretorio_do_automation"

# Getting Started

1. automation/arduino 	: contem os sketch que deve ser gravado no arduino
2. automation/h.php   	: pagina com a função HIGH para o dispositivos
3. automation/l.php   	: pagina com a função LOW para o dispositivos
4. automation/index.html 	: menu principal
5. automation/css	 		: arquivos css das paginas
6. automation/js		 	: arquivos javascript das paginas

# Examples

	nothing, yet (:

# Necessary Hardware

	Arduino
	Difria Rele 5v
	PC (:

# Layout baseando em http://html5up.net/txt
