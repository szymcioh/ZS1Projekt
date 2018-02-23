function begin_game(){
var mouse_x = 0;
var mouse_y = 0;
var game_over = false;
var game = true;
var gamebox = document.getElementById("gamebox");
var fired = false;
var left_down=false;
var right_down=false;
var filterStrength = 20;
var entity_list = [];
function clear_list(){
	for(var i=0;i<entity_list.length;++i)
	{
		gamebox.removeChild(entity_list[i]);
	}
	entity_list = [];
}
document.onmousedown = function(){fired = true;};
document.onmouseup = function(){fired = false;};
document.onkeydown = function(event){
	event = event || window.event;
	if(event.key == "a"){left_down=true;}
	if(event.key == "d"){right_down=true;}
};
document.onkeyup = function(event){
	event = event || window.event;
	if(event.key == "a"){left_down=false;}
	if(event.key == "d"){right_down=false;}
};
var menu = {
	frameTime: 0, 
	lastLoop: new Date, 
	thisLoop: new Date,
	limit: document.createElement("hr"),
	pause_button: document.createElement("button"),
	pause_text: document.createTextNode("P"),
	restart_button: document.createElement("button"),
	restart_text: document.createTextNode("R"),
	alert: document.createElement("div"),
	hp_button: document.createElement("button"),
	score_field: document.createElement("div"),
	score: 0,
	fps_counter: document.createElement("div"),
	fps_check: (function(){
		var thisFrameTime = (menu.thisLoop=new Date) - menu.lastLoop;
		menu.frameTime+= (thisFrameTime - menu.frameTime) / filterStrength;
		menu.lastLoop = menu.thisLoop;
	}),
	alert_over: (function(){
		menu.alert.innerHTML = "GAME OVER";
		pointer.style.visibility = "hidden";
		menu.alert.style.visibility = "visible";
	}),
	update_hp: (function(){
		menu.hp_button.innerHTML = base.hp;
	}),
	update_score: (function(){
		menu.score_field.innerHTML = menu.score;
	}),
	pause: (function(){
		if(game==false){game = true;
		pointer.style.visibility = "visible";
		menu.alert.style.visibility = "hidden";}
		else{game = false;
		menu.alert.innerHTML = "PAUSED";
		pointer.style.visibility = "hidden";
		menu.alert.style.visibility = "visible";}
	}),
	restart: (function(){
		game_over = false;
		game = true;
		menu.alert.style.visibility = "hidden";
		pointer.style.visibility = "visible";
		clear_list();
		base = add_entity("base",gamebox.getBoundingClientRect().width/2,gamebox.getBoundingClientRect().height/2,25);
		pointer = add_entity("pointer",gamebox.getBoundingClientRect().width/2,gamebox.getBoundingClientRect().height/2,8);
		base.hp = 20;
		menu.score = 0;
		menu.update_score();
		menu.update_hp();
		render();
	}),
	init: (function(){
		this.restart_button.appendChild(this.restart_text);
		this.restart_button.addEventListener("click", this.restart);
		gamebox.appendChild(this.restart_button);
		this.pause_button.appendChild(this.pause_text);
		this.pause_button.addEventListener("click", this.pause);
		gamebox.appendChild(this.pause_button);
		gamebox.appendChild(this.alert);
		this.alert.style.position = "absolute";
		this.alert.style.height = 30;
		this.alert.style.width = 140;
		this.alert.className = "textfield";
		this.alert.style.visibility = "hidden";
		gamebox.appendChild(this.hp_button);
		gamebox.appendChild(this.score_field);
		gamebox.appendChild(this.limit);
		gamebox.appendChild(this.fps_counter);
		this.limit.style.position = "absolute";
		this.score_field.className = "score";
		this.limit.className = "limit";
		this.fps_counter.className = "fps";
		this.hp_button.className = "hp";
		this.pause_button.className = "pause";
		this.restart_button.className = "restart";
		this.restart_button.style.float = "left";
		this.pause_button.style.float = "left";
		this.hp_button.style.float = "left";
		this.score_field.style.float = "left";
		this.fps_counter.style.float = "right";
		menu.fps_counter.innerHTML = "... fps";
		setInterval(function(){
			menu.fps_counter.innerHTML = (1000/menu.frameTime).toFixed(0) + " fps";
		},1000);
	}),
};
menu.init();
var mousePos;
document.onmousemove = function(event){
	mouse_x = event.pageX,
	mouse_y = event.pageY
}
function add_entity(entity_class,x,y,r=12)
{
	var new_entity = document.createElement("div");
	entity_list.push(new_entity);
	new_entity.style.position = "absolute";
	new_entity.x_pos = x;
	new_entity.y_pos = y;
	new_entity.x_vel = 0;
	new_entity.y_vel = 0;
	new_entity.r = r;
	new_entity.className = entity_class;
	gamebox.appendChild(new_entity);
	return new_entity;
}

function purge()
{
	var new_list = [];
	for(var i=0;i<entity_list.length;++i)
	{
		if(entity_list[i].className != "empty"){new_list.push(entity_list[i])}
		else{gamebox.removeChild(entity_list[i])}
	}
	entity_list = new_list;
}

function spawn_bullet()
{
	var entity = add_entity("bullet",pointer.x_pos,pointer.y_pos,8);
	var alpha = Math.atan((base.x_pos - entity.x_pos)/(base.y_pos - entity.y_pos));
	if(base.y_pos - entity.y_pos >= 0)
	{	
		entity.y_vel -= Math.cos(alpha)*50;
		entity.x_vel -= Math.sin(alpha)*50;
	}
	else
	{
		entity.y_vel += Math.cos(alpha)*50;
		entity.x_vel += Math.sin(alpha)*50;
	}
}

function spawn_enemy()
{
	var x = Math.random() * gamebox.getBoundingClientRect().width;
	var y = Math.random() * gamebox.getBoundingClientRect().height;
	var entity = add_entity("enemy",x,y);
	var alpha = Math.atan((base.x_pos - entity.x_pos)/(base.y_pos - entity.y_pos));
	if(base.y_pos - entity.y_pos >= 0)
	{	
		entity.y_pos = base.y_pos - Math.cos(alpha)*(gamebox.getBoundingClientRect().height+gamebox.getBoundingClientRect().width)/4;
		entity.x_pos = base.x_pos - Math.sin(alpha)*(gamebox.getBoundingClientRect().height+gamebox.getBoundingClientRect().width)/4;
	}
	else
	{
		entity.y_pos = base.y_pos + Math.cos(alpha)*(gamebox.getBoundingClientRect().height+gamebox.getBoundingClientRect().width)/4;
		entity.x_pos = base.x_pos + Math.sin(alpha)*(gamebox.getBoundingClientRect().height+gamebox.getBoundingClientRect().width)/4;
	}
}
function get_distance(e1,e2){
	return Math.sqrt(Math.pow(e1.x_pos - e2.x_pos,2) + Math.pow(e1.y_pos - e2.y_pos,2));
}
var base = add_entity("base",gamebox.getBoundingClientRect().width/2,gamebox.getBoundingClientRect().height/2,25);
var pointer = add_entity("pointer",gamebox.getBoundingClientRect().width/2,gamebox.getBoundingClientRect().height/2,8);
base.hp = 20;

function update(progress)
{
	function check_hitboxes(entity)
	{
		if(entity.className == "enemy"){
		if(get_distance(this,entity) <= entity.r + this.r)
		{
			entity.className = "blue_explosion";
			entity.lifetime = 100;
			this.className = "empty";
			menu.score += 5;
		}}
	}
	function update_entity(entity)
	{
		if((entity.className == "blue_explosion" || entity.className == "explosion") && entity.lifetime > 0)
		{
			entity.r = (100 - 0.01 * Math.pow(entity.lifetime,2))/2;
			entity.lifetime -= progress * 0.4;
			if(entity.lifetime <= 0){entity.className = "empty";}
		}
		else if(entity.className != "explosion" && entity.className != "blue_explosion" && entity.className != "pointer")
		{
			entity.x_vel = entity.x_vel * progress / (progress + 1.2);
			entity.y_vel = entity.y_vel * progress / (progress + 1.2);
			entity.x_pos += entity.x_vel * progress / 20;
			entity.y_pos += entity.y_vel * progress / 20;
			if(entity.className == "base" && !game_over)
			{
				if(entity.x_pos > gamebox.getBoundingClientRect().width/2*1.5){entity.x_pos = gamebox.getBoundingClientRect().width/2*1.5;}
				else if(entity.x_pos < gamebox.getBoundingClientRect().width/2*0.5){entity.x_pos = gamebox.getBoundingClientRect().width/2*0.5;}
				entity.y_pos = gamebox.getBoundingClientRect().height/2;
				if(right_down){entity.x_vel += progress * 0.1;}
				if(left_down){entity.x_vel -= progress * 0.1;}
			}
			if(entity.className == "bullet")
			{
				entity_list.forEach(check_hitboxes,entity);
				if((entity.x_vel < 1 && entity.x_vel > - 1) && (entity.y_vel < 1 && entity.y_vel > - 1)){entity.className = "empty";}
			}
			if(entity.className == "enemy")
			{
				if(get_distance(base,entity) <= entity.r + base.r)
				{
					entity.className = "explosion";
					entity.lifetime = 100;
					entity.x_vel = 0;
					entity.y_vel = 0;
					entity.r = 0;
					--base.hp;
					if(base.hp == 0){
						menu.update_hp();
						menu.alert_over();
						game_over = true;
					}
				}
			var alpha = Math.atan((base.x_pos - entity.x_pos)/(base.y_pos - entity.y_pos));
			if(base.y_pos - entity.y_pos >= 0)
			{	
				entity.y_vel += Math.cos(alpha)*0.3;
				entity.x_vel += Math.sin(alpha)*0.3;
			}
			else
			{
				entity.y_vel -= Math.cos(alpha)*0.3;
				entity.x_vel -= Math.sin(alpha)*0.3;
			}
			}
		}
	}
	entity_list.forEach(update_entity);
}
function render()
{
	menu.alert.style.left = Math.round(gamebox.getBoundingClientRect().width/2 - 70);
	menu.alert.style.top = Math.round(gamebox.getBoundingClientRect().height/2 - 15);
	menu.limit.style.width = gamebox.getBoundingClientRect().width/2;
	menu.limit.style.left = Math.round(gamebox.getBoundingClientRect().width/2 - gamebox.getBoundingClientRect().width/4);
	menu.limit.style.top = Math.round(base.y_pos - 5);
	function render_entity(entity)
	{
		entity.style.height = entity.r*2;
		entity.style.width = entity.r*2;
		entity.style.left = Math.round(entity.x_pos - entity.r);
		entity.style.top = Math.round(entity.y_pos - entity.r);
	}
	entity_list.forEach(render_entity);
}
function update_pointer(){
	var entity = pointer;
	entity.x_pos = mouse_x - gamebox.getBoundingClientRect().left;
	entity.y_pos = mouse_y - gamebox.getBoundingClientRect().top;
	var alpha = Math.atan((base.x_pos - entity.x_pos)/(base.y_pos - entity.y_pos));
	if(base.y_pos - entity.y_pos >= 0)
	{	
		entity.y_pos = base.y_pos - Math.cos(alpha)*base.r;
		entity.x_pos = base.x_pos - Math.sin(alpha)*base.r;
	}
	else
	{
		entity.y_pos = base.y_pos + Math.cos(alpha)*base.r;
		entity.x_pos = base.x_pos + Math.sin(alpha)*base.r;
	}
}
function loop(timestamp){
	var progress = timestamp - lastRender;
	menu.fps_check();
	if(game){
		update(progress);
		purge();
		render();
		if(!game_over){
		update_pointer()
		menu.update_hp();
		menu.update_score();
		if(fired && timestamp - lastFired > 200)
		{
			spawn_bullet();
			lastFired = timestamp;
		}
		if(timestamp - lastSpawn > 500)
		{
			spawn_enemy();
			lastSpawn = timestamp;
		}}
	}
	lastRender = timestamp;
	window.requestAnimationFrame(loop)
}
var lastFired = 0;
var lastRender = 0;
var lastSpawn = 0;
window.requestAnimationFrame(loop)
}