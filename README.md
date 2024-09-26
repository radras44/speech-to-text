## Descripción

Este proyecto ha sido creado con el fin de que personas sordas puedan comunicarse con sus parientes/cercanos a través de una app que pueda transcribir audio a texto y mostrarlo en forma de un chat, el cual cada uno podrá leer.

## Requisitos

* Python [3.7 - 3.9] (el proyecto usa un modelo de IA solo compatible con dependencias disponibles en estas versiones de Python, en la instalacion al crear el entorno con anaconda debería instalar una version python compatible).
* `soundfile` (backend de audio necesario para torchaudio, debe instalarse una versión compilada en su máquina a través de pip `pip install soundfile`).

## Instalación

* Descargar el repositorio.
* Crear un entorno de Anaconda usando el **environment.yml**.
* Iniciar el servidor con `python main.py`.

## Advertencia

* El servidor, por defecto, está configurado para usar un certificado simple para poder usar el protocolo `https` (seguro). Se requiere que el servidor sea https debido a que el método `navigator.mediaDevices.getUserMedia()`, que se encarga de pedir permiso para acceder al micrófono del usuario, solo está disponible al usar `https`.

* El modelo de IA no es de mi propiedad, estoy usando el modelo sp_v1 de Silero, por lo que cualquier inconveniente puede consultarlo en el siguiente repositorio: [silero-models](https://github.com/snakers4/silero-models?tab=readme-ov-file#dependencies).
