#pragma strict

class CameraFollow extends MonoBehaviour {

	var target : Transform;
	var smoothing: float = 5.0;
	
	private var offset : Vector3;
	
	function Start() {
		offset = transform.position - target.position;
	}
	
	function FixedUpdate() {
		
		var targetCameraPosition = target.position + offset;
		transform.position = Vector3.Lerp(transform.position, targetCameraPosition, smoothing * Time.deltaTime);
	}
}