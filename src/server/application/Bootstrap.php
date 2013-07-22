<?php

class Bootstrap extends Zend_Application_Bootstrap_Bootstrap
{

    protected function _initError(){
        $front = Zend_Controller_Front::getInstance();
        $front->registerPlugin(new Zend_Controller_Plugin_ErrorHandler(array(
            'module'     => 'v1',
            'controller' => 'error',
            'action'     => 'index'
        )));
    }

	protected function _initDbAdapter() {
        $this->bootstrap('db');
        $db = $this->getResource('db');
        Zend_Registry::set('db' , $db);
    }

    protected function _initAutoloaderSetup(){
        $autoloader = new Zend_Application_Module_Autoloader(array(
                'namespace' => 'V1_',
                'basePath'  => dirname(__FILE__) . '/modules/v1',
        ));
    }

    protected function _initView()
    {
        // Initialize view
        $view = new Zend_View();
        
        // Add it to the ViewRenderer
        $viewRenderer = Zend_Controller_Action_HelperBroker::getStaticHelper(
            'ViewRenderer'
        );
        $viewRenderer->setView($view);
 
        // Return it, so that it can be stored by the bootstrap
        return $view;
    }

    protected function _initMisc(){
        date_default_timezone_set('UTC');
        Zend_Date::setOptions(array('format_type' => 'php'));
    }

}

