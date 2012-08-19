/*
 * Texture Size to Transform by Owlchemy Labs
   * This tool allows you to scale objects to display on screen at the exact pixel dimensions as the textures assigned to their materials.
   * 
   * Quickstart:
   	 * 1) Set the static variables of the classto match your project&scene stup
   	 * 2) Use the Cmd+T (Ctrl+T on Windows) key command in Unity to scale the selected object according to its texture dimensions.
   	 * 3) Use the Cmd+Shift+T (Ctrl+Shift+T on Windows) key command in Unity to find out the ideal texture dimensions for the selected object.
   * 
   * For support, please e-mail info@owlchemylabs.com.
   * Owlchemy Labs
 */

using UnityEngine;
using UnityEditor;

public class TextureSizeToTransform : ScriptableObject {
	
	//Set the following values according to your project&scene setup before using this script
	static Vector2 unityScreenResolution = new Vector2(1024, 768); //target resolution
	static Vector2 unityFullScreenPlaneScale = new Vector2(120f, 90f); //scale of a plane when it covers the entire screen
	static Vector3 widthAxis = Vector3.right; //axis which affects the screen width of a plane
	static Vector3 heightAxis = Vector3.forward; //axis which affects the screen height of a plane
	static Vector3 depthAxis = Vector3.up; //depth axis that doesn't affect the screen size of a plane
	
	//Looks at the current texture assigned to the plane to re-scale it to display at the exact texture size on screen
	[MenuItem ("Tools/Scale To Texture Size %t")] //Shortcut Cmd+T (Mac) - Ctrl+T (Win)
	static void ScaleToTextureSize() {
		Transform selectedT = Selection.activeTransform;
		if(selectedT == null) {
			Debug.Log("No transform selected.");
			return;
		}
		Texture2D tex = selectedT.renderer.sharedMaterial.mainTexture as Texture2D;
		float xScale = (unityFullScreenPlaneScale.x / unityScreenResolution.x) * tex.width;
		float yScale = (unityFullScreenPlaneScale.y / unityScreenResolution.y) * tex.height;
		selectedT.localScale = widthAxis * xScale + heightAxis * yScale + depthAxis;
	}
	
	//Looks at the current scale of a plane and determines optimal size of texture to be assigned to plane
	[MenuItem ("Tools/Optimal Texture Size %#t")] //Shortcut Cmd+Shift+T (Mac) - Ctrl+Shift+T (Win)
	static void OptimalTextureSize() {
		Transform selectedT = Selection.activeTransform;
		if(selectedT == null) {
			Debug.Log("No transform selected.");
			return;
		}
		
		float xSize = (selectedT.localScale.x / unityFullScreenPlaneScale.x) * unityScreenResolution.x;
		float ySize = (selectedT.localScale.y / unityFullScreenPlaneScale.y) * unityScreenResolution.y;
		Debug.Log("Optimal Texture size is (" + Mathf.Round(xSize).ToString() + ", " + Mathf.Round(ySize).ToString() + ").");
	}
}
