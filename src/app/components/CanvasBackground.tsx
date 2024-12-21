"use client";
import { useEffect, useRef } from "react";

const CanvasBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d") as CanvasRenderingContext2D;
    if (!context) return;

    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current = {
        x: event.clientX,
        y: event.clientY,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);

    interface ParticleProps {
      x: number;
      y: number;
      dx: number;
      dy: number;
      radius: number;
      update: () => boolean;
    }

    class Particle implements ParticleProps {
      constructor(
        public x: number,
        public y: number,
        public dx: number,
        public dy: number,
        public radius: number
      ) {}

      // mouse interaction on particles
      update = () => {
        if (!canvas || !context) return true;

        const mouseDistance = Math.sqrt(
          (this.x - mouseRef.current.x) ** 2 +
            (this.y - mouseRef.current.y) ** 2
        );
        const repulsionRadius = 100;
        const repulsionStrength = 0.25;

        // mouse repulsion
        if (mouseDistance < repulsionRadius) {
          const angle = Math.atan2(
            this.y - mouseRef.current.y,
            this.x - mouseRef.current.x
          );
          const force = (repulsionRadius - mouseDistance) / repulsionRadius;

          this.dx += Math.cos(angle) * force * repulsionStrength;
          this.dy += Math.sin(angle) * force * repulsionStrength;
        }

        // friction
        this.dx *= 0.99;
        this.dy *= 0.99;

        // random movement
        const baseSpeed = 0.1;
        this.dx += (Math.random() - 0.5) * baseSpeed;
        this.dy += (Math.random() - 0.5) * baseSpeed;

        this.x += this.dx;
        this.y += this.dy;

        // is offscreen
        return (
          this.x + this.radius < -50 ||
          this.x - this.radius > canvas.width + 50 ||
          this.y + this.radius < -50 ||
          this.y - this.radius > canvas.height + 50
        );
      };
    }

    const createParticle = () => {
      const radius = Math.random() * 3 + 1;
      // random position
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      // random velocity
      const dx = (Math.random() - 0.5) * 0.3;
      const dy = (Math.random() - 0.5) * 0.3;
      return new Particle(x, y, dx, dy, radius);
    };

    // number of particles/points
    const particles: Particle[] = [];
    const particleCount = 100;

    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle());
    }

    let hue = 0;
    let lastTime = 0;

    const animate = (currentTime: number) => {
      if (!canvas || !context) return;
      context.clearRect(0, 0, canvas.width, canvas.height);

      // check to add particles
      if (currentTime - lastTime > 100) {
        while (particles.length < particleCount) {
          particles.push(createParticle());
        }
        lastTime = currentTime;
      }

      // lines
      particles.forEach((p1, index) => {
        for (let j = index + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distance = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);

          // connect lines depending on distance
          if (distance < 150) {
            context.beginPath();
            context.moveTo(p1.x, p1.y);
            context.lineTo(p2.x, p2.y);
            const opacity = (1 - distance / 150) * 0.5;
            context.strokeStyle = `hsla(${hue}, 70%, 40%, ${opacity})`;
            context.lineWidth = 1;
            context.stroke();
          }
        }
      });

      // update particles on screen
      for (let i = particles.length - 1; i >= 0; i--) {
        const isOffscreen = particles[i].update();
        if (isOffscreen) {
          particles.splice(i, 1);
        }
      }

      // cycling colors
      hue = (hue + 0.1) % 360;
      requestAnimationFrame(animate);
    };

    animate(0);

    // cleanup when unmounting
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // render canvas
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
      }}
    />
  );
};

export default CanvasBackground;

{
  /*
    Things to alter for reference:
        particleCount, repulsionRadius, repulsionStrength, baseSpeed, connection distance, friction, generation interval
    */
}
