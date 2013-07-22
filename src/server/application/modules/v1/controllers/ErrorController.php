<?php

class V1_ErrorController extends Zend_Rest_Controller
{
	public function init()
    {
        $this->_helper->viewRenderer->setNoRender(true);
        $this->getResponse()->setHeader('Content-Type', 'application/json', true);
    }

    public function headAction()
    {
        // you should add your own logic here to check for cache headers from the request
        $this->getResponse()->setBody(null);
    }

    public function optionsAction()
    {
        $this->getResponse()->setBody(null);
        $this->getResponse()->setHeader('Allow', 'OPTIONS, HEAD, INDEX, GET, POST, PUT, DELETE');
    }

    public function getAction()
    {
     	$this->getResponse()->setBody(null);
        $this->getResponse()->setHttpResponseCode(400);   
    }

    public function postAction()
    {
		$this->getResponse()->setBody(null);
        $this->getResponse()->setHttpResponseCode(400);   
    }

    public function putAction()
    {
    	$this->getResponse()->setBody(null);
        $this->getResponse()->setHttpResponseCode(400);   
    }

    public function deleteAction()
    {
    	$this->getResponse()->setBody(null);
        $this->getResponse()->setHttpResponseCode(400);   
    }

    public function indexAction()
    {
    	$body = array();
        $errors = $this->_getParam('error_handler');
        
        if (!$errors || !$errors instanceof ArrayObject) {
            $body['message'] = 'You have reached the error page';
            $this->getResponse()->setBody(json_encode($body));
            $this->getResponse()->setHttpResponseCode(400);
            return;
        }
        
        switch ($errors->type) {
            case Zend_Controller_Plugin_ErrorHandler::EXCEPTION_NO_ROUTE:
            case Zend_Controller_Plugin_ErrorHandler::EXCEPTION_NO_CONTROLLER:
            case Zend_Controller_Plugin_ErrorHandler::EXCEPTION_NO_ACTION:
                // 404 error -- controller or action not found
                $this->getResponse()->setHttpResponseCode(404);
                $priority = Zend_Log::NOTICE;
                $body['message'] = 'Page not found';
                break;
            default:
                // application error
                $this->getResponse()->setHttpResponseCode(500);
                $priority = Zend_Log::CRIT;
                $body['message'] = 'Application error';
                break;
        }
        
        // Log exception, if logger available
        if ($log = $this->getLog()) {
            $log->log($body['message'], $priority, $errors->exception);
            $log->log('Request Parameters', $priority, $errors->request->getParams());
        }
        
        // conditionally display exceptions
        if ($this->getInvokeArg('displayExceptions') == true) {
            $body['exception'] = (array) $errors->exception;
        }
        
        $body['request'] = (array) $errors->request;

        $this->getResponse()->setBody(json_encode($body));
        $this->getResponse()->setHttpResponseCode(400);
    
    }

	public function getLog()
    {
        $bootstrap = $this->getInvokeArg('bootstrap');
        if (!$bootstrap->hasResource('Log')) {
            return false;
        }
        $log = $bootstrap->getResource('Log');
        return $log;
    }
}

