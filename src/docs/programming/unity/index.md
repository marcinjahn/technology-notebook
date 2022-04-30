---
title: Unity
description: Unity Overview
tags: unity, game, dev
lang: en-US
---

# {{ $frontmatter.title }}

To run Unity, you need to install Unity Hub, which is a manager of Unity
installations. Through the Unity Hub, install the lateset release of Unity, and
run.

::: tip Apple Silicon 
On Apple Silicon macs, for some reason, Intel binary is being downloaded. It's
better to manually select the Apple Silicon version.
:::

## Hierarchy

Game objects create a hierarchy. We can place items under other items. Then, the
positioning of the child items is relative to their parents.

## Scripting

Scripts can be added to the Assets, and they should be attached to some game
object to work.

## Collisions

If we want to collide with some object, both objects should have a **Collider**.
Additionally, to make the objects move on collision, they need to gave
**Rigidbody**. Rigidbody is what adds physics to the objects. One of its
properties is **Gravity**. In 2D top-down games, Gravity should be brought down
to 0, otherwise the Rigidbody will cause the game object to fall down.

::: tip Physics Sprite
Instead of creating a Sprite, attaching a Collider and Rigidbody, we can create
a Physics Dynamic Sprite, which out-of-the box is a Circle with a Collider and
Rigidbody.
:::

::: warning Falling Through
The default Rigidbody's Collision Detection is **Discrete**. It's better for
performance, but it might cause the collision detection to fail sometimes
(when?). A fix for that is to change the detection to **Continuous**.
:::

## Timing

The spped of movement of objects should not rely on FPS of the host machine. We
should multiply the object's translation by the `Time.deltaTime`, which is the
time frame. This way, the intended translation will be properly divided for each
frame giving us the desired translation after each second.

## Units

Unity does not have any particuar unit system. While designing our games, we
should come up with our own way understanding these units. One way is to treat 1
Unity unit as 1 meter. This way, the grid on the screen divides the world in 1m
x 1m squares. We can scale game objects with regard to that system. The same
way, we can calculate speed of objects, to make things look and behave
"naturally".

## Sprite Shape

Sprite Shape is perfect for creating ground in 2D platformer games. It allows us
to modify the shape of the land easily with vector graphics tools. We sould add
an **Edge Collider** to it, and it will automatically follow the Sprite Shape's
shape. Sometimes it's necessary to adjust the offset of the Shape Controller to
have the collision exactly where we want it to be.

![](./assets/sprite-shape-collision.png)

## Camera Follow

To have the Camera following the plater, we can do one of:

- script the camera position to be updated in every frame to player's position

    ```cs
    transform.position = _thingToFollow.transform.position + new Vector3(0, 0, -10);
    // we're adding -10 on Z axis to keep the camera away from the game world
    ```

- use **Cinemachine** - a package for camera management