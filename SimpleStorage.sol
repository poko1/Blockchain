
contract SimpleStorage {

    string ipfsHash;
    string i;
    string m;
    string e;
    //technician sends hash to patient
    function set (string memory hash)
        public
    {
           ipfsHash= hash;
    }
    
    //patient gets hash of image they want to view
    function get() public view returns (string memory)
    {
         return ipfsHash;   
    }
    
    
	// sets corresponding iv generated
    function seti (string memory hash)
        public
    {
           i= hash;
    }
    
    // gets corresponding iv generated
    function geti() public view returns (string memory)
    {
         return i;   
    }
	
	// sets corresponding mac generated
    function setm (string memory hash)
        public
    {
           m= hash;
    }
	
	// gets corresponding mac generated
    function getm() public view returns (string memory)
    {
         return m;   
    }
    
	// sets corresponding ephimericpublickey generated
    function sete (string memory hash)
        public
    {
           e= hash;
    }
	
	// gets corresponding ephimericpublickey generated
    function gete() public view returns (string memory)
    {
         return e;   
    }
        
}
