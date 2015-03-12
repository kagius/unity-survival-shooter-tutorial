#pragma strict

class EnemyMovement extends MonoBehaviour {

	private var player : Transform;
	private var nav : NavMeshAgent;
	
	private var playerHealth : PlayerHealth;
	private var enemyHealth : EnemyHealth;
	
	function Awake ()
	{	
	    player = GameObject.FindGameObjectWithTag ("Player").transform;
	    nav = GetComponent (NavMeshAgent);
	    
	    playerHealth = player.GetComponent (PlayerHealth);
    	enemyHealth = GetComponent (EnemyHealth);
	}
	
	function Update ()
	{
	    // If the enemy and the player have health left...
	    if(enemyHealth.currentHealth > 0 && playerHealth.currentHealth > 0)
	    {
	        // ... set the destination of the nav mesh agent to the player.
	        nav.SetDestination (player.position);
	    }
	    // Otherwise...
	    else
	    {
	        // ... disable the nav mesh agent.
	        nav.enabled = false;
	    }
	}
}