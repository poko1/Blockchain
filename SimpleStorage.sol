
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
        
}
