  let engine = Matter.Engine.create();

      let render = Matter.Render.create({
          element: document.body,
          engine: engine,
          options: {
            width: 1600,
            height: 800, 
            wireframes: false
        }
      });
      
      let ground = Matter.Bodies.rectangle(1200, 500, 300, 20, { isStatic: true }); 
      
      let ball = Matter.Bodies.circle(300, 600,20);
      let sling = Matter.Constraint.create({ 
            pointA: { x: 300, y: 600 }, 
            bodyB: ball, 
            stiffness: 0.05
        });
      
      let mouse = Matter.Mouse.create(render.canvas);
      let mouseConstraint = Matter.MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                render: {visible: false}
            }
        });
      render.mouse = mouse;
      
      let firing = false;
      Matter.Events.on(mouseConstraint,'enddrag', function(e) {
        if(e.body === ball) firing = true;
      });
      Matter.Events.on(engine,'afterUpdate', function() {
        if (firing && Math.abs(ball.position.x-300) < 20 && Math.abs(ball.position.y-600) < 20) {
            ball = Matter.Bodies.circle(300, 600, 20);
            Matter.World.add(engine.world, ball);
            sling.bodyB = ball;
            firing = false;
        }
      });

      let stack = Matter.Composites.stack(1100, 270, 4, 4, 0, 0, function(x, y) { 
          return Matter.Bodies.polygon(x, y, 8, 30);
      });

      Matter.World.add(engine.world, [stack, ground, ball, sling, mouseConstraint]);
      Matter.Engine.run(engine);
      Matter.Render.run(render);
      