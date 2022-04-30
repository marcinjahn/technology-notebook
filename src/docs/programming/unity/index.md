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

## Scripting

Scripts can be added to the Assets, and they should be attached to some game
object to work.

## Collisions

If we want to collide with some object, both objects should have a **Collider**.
Additionally, to make the objects move on collision, they need to gave **Rigid
Body**. In 2D top-down games, *Gravity* should be brought down to 0, otherwise
the Rigid Body will cause the game object to fall down.

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