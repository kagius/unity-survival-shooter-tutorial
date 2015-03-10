#pragma strict

class PlayerMovement extends MonoBehaviour {
	
	var speed : float = 6.0;
	
	private var movement : Vector3 = new Vector3();
	private var anim : Animator;
	private var playerRigidBody : Rigidbody;
	
	private var floorMask : int;
	private var cameraRayLength : float = 100.0;
	
	function Awake() {
	
		floorMask = LayerMask.GetMask("Floor");
		anim = GetComponent(Animator);
		Debug.Log(anim);
		playerRigidBody = GetComponent(Rigidbody);
	}
	
	function FixedUpdate() {
	
		var h = Input.GetAxisRaw("Horizontal");
		var v = Input.GetAxisRaw("Vertical");
		
		Move (h, v);
		Turn();
		Animate(h, v);
	}
	
	function Move(h: float, v: float) {
		movement.Set(h, 0, v);
		movement = movement.normalized * speed * Time.deltaTime;
		playerRigidBody.MovePosition(transform.position + movement);
	}
	
	function Turn() {
	
		var cameraRay = Camera.main.ScreenPointToRay(Input.mousePosition);
		var floorHit : RaycastHit;
		
		if (Physics.Raycast(cameraRay.origin, cameraRay.direction, floorHit, cameraRayLength, floorMask)){
			var playerToMouse : Vector3 = floorHit.point - transform.position;
			playerToMouse.y = 0;
			
			var newRotation : Quaternion = Quaternion.LookRotation(playerToMouse);
			playerRigidBody.MoveRotation(newRotation);
		}
	}
	
	function Animate(h, v) {
	
		var walking = h != 0 || v != 0;
		Debug.Log(walking);
		anim.SetBool("IsWalking", walking);
	}
}