
/**
 * UninstallDetector
 * 
 * @example
 * @abstract
 */
window.UninstallDetector = (function() {

    /**
     * __callback
     * 
     * @access  private
     * @var     undefined|Function
     */
    var __callback;

    /**
     * __intervalDuration
     * 
     * @access  private
     * @var     Number (default: 1250)
     */
    var __intervalDuration = 1250;

    /**
     * __intervalReference
     * 
     * @access  private
     * @var     undefined|Number
     */
    var __intervalReference;

    /**
     * __sendPing
     * 
     * @access  private
     * @return  void
     */
    var __sendPing = function() {
        chrome.runtime.sendMessage({
            'type': 'ping'
        });
    };

    /**
     * __setupInterval
     * 
     * @access  private
     * @return  void
     */
    var __setupInterval = function() {
        __intervalReference = setInterval(function() {
            try {
                __sendPing();
            } catch (err) {
                clearInterval(__intervalReference);
                __callback();
            }
        }, __intervalDuration)
    };

    // Public
    return {

        /**
         * init
         * 
         * @access  public
         * @param   Function callback
         * @return  void
         */
        init: function (callback) {
            __callback = callback;
            __setupInterval();
        }
    };
})();
