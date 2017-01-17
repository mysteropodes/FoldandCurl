//Script by bigxixi, contact xixi@bigxixi.com
(function ALL(thisObj)
{
	var ScriptName = "Fold and Curl v1.0";
	var Description = "A script to make curling and folding.";
	var Direction = "Direction";
	var Up = "up";
    var Right = "right";
    var Down = "down";
    var Left = "left";
	var Count = "Count";
	var Setting = "Settings";
    var Curl = "Curl";
    var Fold = "Fold";
    var FromBefore = "Link to Preview";
	var GButton = "Generate";
	var HButton = "Help";
    var HelpText =  ' How to Use:\n' +
                    '1. Select layer(s) as an element to fold or curl.\n' +
                    'The script generates the curl chain by a layer\'s width or height, which means layers like textlayer or shapelayer should be pre-composed and set the width and height to work properly.\n' +
                    '2. Take a direction.\n' +
                    '3. Input the count of elements to be generated.\n' +
                    '4. Select the behavior, fold or curl.  \n' +
                    '5. If you want to generate a sub chain of a preview one, check the "Link to Preview".\n' +
                    '\n' +
                    'note:\n' +
                    '1. Add ONLY ONE direction to the ROOT element.\n' +
                    '2. Don\'t generate more then once in one direction.\n' +
                    '\n' +
                    'How to control:\n' +
                    '1. Select the root element - effect - angle control to control the fold or curl progress.\n' +
                    '2. You can toggle the orientation of each "sub chain" by just selecting them.\n' +
                    '\n' +
                    'contact: xixi@bigxixi.com\n';
    var Angle = "Angel";
    var ChangeAngle = "Change Orientation";
	var Error1 = "Error1";
    var Error2 = "Error2";
    var Error3 = "Error3";
    var Alert1 = "Can not do it with Camera and Light layers.";
	var Alert2 = "No layers selected.";
	var ScriptNotRun = "Script is down.Please restart it or contact xixi@bigxixi.com ";
	if($.locale.toLowerCase() == "zh_cn"){
		ScriptName = "卷曲与折叠脚本 v1.0";
		Description = "轻松制作卷曲、折叠效果！";
		Direction = "方向";
		Up = "上";
        Right = "右";
        Down = "下";
        Left = "左";
		Count = "增加数量";
		Setting = "设置";
        Curl = "卷曲";
        Fold = "折叠";
        FromBefore = "继承之前元素";
		GButton = "生成";
		HButton = "帮助";
        Angle = "折叠角度";
        ChangeAngle = "换方向";
        HelpText =  '使用步骤：\n' +
                    '1、选中一个或多个图层，每个被选中的图层将作为被折叠的基本元素。\n' +
                    '注意：生成后每个元素是根据图层的宽或高属性来判断贴合的，也就是说如果想将文字、形状图层等作为基本元素，建议先预合成并设置好长宽再进行。\n' +
                    '\n' +
                    '2、选择生成链条的方向。\n' +
                    '3、输入希望复制多少个基本元素。请输入大于0的整数否则会出问题。\n' +
                    '4、选择折叠或卷曲方式。\n' +
                    '5、如果选中的图层是之前构建的元素：若想作为分支继承之前的链条，请勾选继承之前元素。否则将会断开之前的链条，以选中的元素为新元素构建链条。\n' +
                    '6、点击生成。\n' +
                    '\n' +
                    '注意：\n' +
                    '1、根元素暂时只能生成一个方向，不要多生成。\n' +
                    '2、每个元素同一方向只能生成一次，不然会出错。\n' +
                    '\n' +
                    '生成之后的控制：\n' +
                    '1、选中根元素-效果-角度，可以控制整个链条的折叠或卷曲进度。\n' +
                    '2、每个继承生成的元素可以控制以它为元素生成的链条的卷曲或折叠方向。\n' +
                    '\n' +
                    '联系我：xixi@bigxixi.com\n';
		Error1 = "发生未知错误。代码1。";
        Error2 = "发生未知错误。代码2。";
        Error3 = "发生未知错误。代码3。";
        Alert1 = "无法对摄像机图层和灯光图层进行操作！";
		Alert2 = "请选择图层。";
		ScriptNotRun = "脚本运行失败，请重新运行。";
	}
	var drawUI = UI(thisObj);
	if(drawUI instanceof Window){
			drawUI.center();
			drawUI.show();
	}else{
		drawUI.layout.layout(true);
	}

	function UI(thisObj){
		var win = (thisObj instanceof Panel) ? thisObj : new Window("palette",ScriptName,undefined);
		if(win != null){
            win.alignChildren = "fill";
            var grp1 = win.add("group");
            var dcp = grp1.add("statictext",undefined,Description);
                dcp.alignment = ["center","center"];
            var pal1 = win.add("panel");
                pal1.text = Direction;
                pal1.orientation = "row";
                pal1.spacing = 20;
            var upChecked = pal1.add("radiobutton",undefined,Up);
            var rightChecked = pal1.add("radiobutton",undefined,Right);
                rightChecked.value = 1;
            var downChecked = pal1.add("radiobutton",undefined,Down);
            var leftChecked = pal1.add("radiobutton",undefined,Left);
            var pal2 = win.add("panel");
                pal2.text = Count;
                pal2.alignChildren = "Fill";
            var count = pal2.add("edittext",undefined,1);
            var pal3 = win.add("panel");
                pal3.text = Setting;
                pal3.orientation = "row";
                pal3.alignChildren = "Fill";
            var foldDirection1 = pal3.add("radiobutton",undefined,Curl);
                foldDirection1.value = 1;
                foldDirection1.alignment = ['left', 'center'];
            var foldDirection2 = pal3.add("radiobutton",undefined,Fold);
                foldDirection2.alignment = ['left', 'center'];
            var fromPrev = pal3.add("checkbox",undefined,FromBefore);
                fromPrev.value = 0;
                fromPrev.alignment = ['right', 'center'];
            var grp2 = win.add("group");
                grp2.alignChildren = "fill";

            var btn1 = grp2.add("button",undefined,GButton);
                btn1.alignment = ['left', 'center'];
            var btn2 = grp2.add("button",undefined,HButton);
                btn2.alignment = ['right', 'center'];
                btn1.onClick = function(){
                    if(app.project.activeItem.selectedLayers.length > 0){
                        //+检测输入是否大于0的整数?
                        app.beginUndoGroup("generate");
                        app.project.activeItem.hideShyLayers = true;
                        for(var n=0;n<app.project.activeItem.selectedLayers.length;n++){
                            var layer = app.project.activeItem.selectedLayers[n];
                            if(!(layer instanceof CameraLayer || layer instanceof LightLayer)){
                                layer.threeDLayer  = 1;
                                if(fromPrev.value == 0){
                                    layer.shy = false;
                                    layer.parent = null;
                                    layer.transform.xRotation.expression = "";
                                    layer.transform.yRotation.expression = "";
                                }
                                var layerNameTemp = layer.name;
                                if(layerNameTemp.substring(layerNameTemp.length-8,layerNameTemp.length) != "_control"){
                                    layer.name = layer.name + "_control";
                                } 
                                var w = layer.width;
                                var h = layer.height;
                                var pX = layer.transform.position.value[0];
                                var pY = layer.transform.position.value[1];
                                var aX = layer.transform.anchorPoint.value[0];
                                var aY = layer.transform.anchorPoint.value[1];

                                if(rightChecked.value == true){
                                    var dirTemp = Right;
                                    var aXnew = 0;
                                    var aYnew = h/2;
                                    var expAxiz = 1;
                                    var pXnew = pX - aX + aXnew;
                                    var pYnew = pY - aY + aYnew;
                                }else if(upChecked.value == true){
                                    var dirTemp = Up;
                                    var aXnew = w/2;
                                    var aYnew = h;
                                    var expAxiz = 2;
                                    var pXnew = pX - aX + aXnew;
                                    var pYnew = pY - aY + aYnew;
                                }else if(leftChecked.value == true){
                                    var dirTemp = Left;
                                    var aXnew = w;
                                    var aYnew = h/2;
                                    var expAxiz = 3;
                                    var pXnew = pX - aX + aXnew;
                                    var pYnew = pY - aY + aYnew;                               
                                }else if(downChecked.value == true){
                                    var dirTemp = Down;
                                    var aXnew = w/2;
                                    var aYnew = 0;
                                    var expAxiz = 4;
                                    var pXnew = pX - aX + aXnew;
                                    var pYnew = pY - aY + aYnew;
                                }else{
                                    alert(Error1);
                                    break;
                                };
                                var tempRoot = layer.duplicate();
                                    tempRoot.transform.anchorPoint.setValue([aXnew,aYnew,0]);
                                    tempRoot.transform.position.setValue([pXnew,pYnew,0]);
                                tempRoot.comment = dirTemp;              
                                if(fromPrev.value == 0 || layer.parent == null){
                                    layer.comment = dirTemp + "Root";
                                    layer.transform.anchorPoint.setValue([aXnew,aYnew,0]);
                                    layer.transform.position.setValue([pXnew,pYnew,0]);
                                    var angle = layer.Effects.addProperty("ADBE Angle Control");
                                    var angleNameTemp = Angle + "_" + dirTemp;
                                        angle.name = angleNameTemp;
                                    if(expAxiz%2 != 0){
                                        layer.transform.orientation.expression = "[0,-(transform.yRotation%360)*0.5,0]";
                                        layer.transform.yRotation.expression = "effect('" + angleNameTemp + "')('ADBE Angle Control-0001')"; 
                                    }else{
                                        layer.transform.orientation.expression = "[-(transform.xRotation%360)*0.5,0,0]";
                                        layer.transform.xRotation.expression = "effect('" + angleNameTemp + "')('ADBE Angle Control-0001')"; 
                                    }
                                }else{
                                    var angle = layer.Effects.addProperty("ADBE Angle Control");
                                    var angleNameTemp = Angle + "_" + dirTemp;
                                        angle.name = angleNameTemp;
                                    var changeDirection = layer.Effects.addProperty("ADBE Checkbox Control");
                                    var changeDirectionNameTemp = ChangeAngle + "_" + dirTemp;
                                        changeDirection.name = changeDirectionNameTemp;
                                    ///check parent
                                    if(expAxiz%2 != 0){
                                        layer.effect(angleNameTemp)('ADBE Angle Control-0001').expression = "(2*effect('" + changeDirectionNameTemp + "')('ADBE Checkbox Control-0001')-1)*transform.xRotation";
                                    }else{
                                        layer.effect(angleNameTemp)('ADBE Angle Control-0001').expression = "(2*effect('" + changeDirectionNameTemp + "')('ADBE Checkbox Control-0001')-1)*transform.yRotation";
                                    }
                                }
                                layer.transform.orientation.expressionEnabled = foldDirection2.value;
                                var tempLayer = [];
                                for(var i=0;i<count.text;i++){    
                                    tempLayer.push(tempRoot.duplicate());
                                    tempLayer[i].shy = true;
                                    tempLayer[i].name = layerNameTemp + " _node_" + (i + 1) ;
                                    var parentTemp;
                                    if(i == 0){
                                        parentTemp = layer;
                                    }else{
                                        parentTemp = tempLayer[i-1];
                                        tempLayer[i].moveBefore(parentTemp);
                                    };
                                    var foldDirection;
                                    if(foldDirection2.value == true){
                                        foldDirection = "(2*("+ i + "%2)-1)";
                                    }else{
                                        foldDirection = 1;
                                    }
                                    if(expAxiz == 1){
                                        tempLayer[i].transform.position.setValue([(pXnew + w*(i+1)),pYnew,0]);
                                        tempLayer[i].transform.xRotation.expression = "";
                                        tempLayer[i].transform.yRotation.expression = foldDirection +'*thisComp.layer("' + layer.name + '").effect("' + angleNameTemp + '")("ADBE Angle Control-0001")';
                                    }else if(expAxiz == 2){
                                        tempLayer[i].transform.position.setValue([pXnew,(pYnew - h*(i+1)),0]);
                                        tempLayer[i].transform.xRotation.expression = foldDirection +'*thisComp.layer("' + layer.name + '").effect("' + angleNameTemp + '")("ADBE Angle Control-0001")';
                                        tempLayer[i].transform.yRotation.expression = "";
                                    }else if(expAxiz == 3){
                                        tempLayer[i].transform.position.setValue([(pXnew - w*(i+1)),pYnew,0]);
                                        tempLayer[i].transform.xRotation.expression = "";
                                        tempLayer[i].transform.yRotation.expression = foldDirection +'*thisComp.layer("' + layer.name + '").effect("' + angleNameTemp + '")("ADBE Angle Control-0001")';
                                    }else if(expAxiz == 4){
                                        tempLayer[i].transform.position.setValue([pXnew,(pYnew + h*(i+1)),0]);
                                        tempLayer[i].transform.xRotation.expression = foldDirection +'*thisComp.layer("' + layer.name + '").effect("' + angleNameTemp + '")("ADBE Angle Control-0001")';
                                        tempLayer[i].transform.yRotation.expression = "";
                                    }else {
                                        alert(Error2);
                                        break;
                                    }
                                    tempLayer[i].parent = parentTemp;
                                    if(i == count.text){
                                        tempLayer[i].commemt = dirTemp + "End";
                                    }
                                }
                                    tempRoot.remove();
                            }else{
                                alert(Alert1);
                            }
                            app.endUndoGroup();
                        }
                    }else{
                        alert(Alert2);
                    }
                }
                btn2.onClick = function () {
                    alert(HelpText,"HELP");
                }
        }else{
                alert(ScriptNotRun);
        }
        return win;
	   }
})(this)
