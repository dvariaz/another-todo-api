const { relocateTaskGroup } = require("../../utils/task_groups");

describe("Task group relocation", () => {
  const initialCollection = [
    { _id: "0", position: 0 },
    { _id: "1", position: 1 },
    { _id: "2", position: 2 },
    { _id: "3", position: 3 },
    { _id: "4", position: 4 },
  ];

  test("Should update all positions of items moving from less index to greater index", () => {
    const taskGroupToMove = "1";
    const targetPosition = 3;

    const finalCollection = relocateTaskGroup(
      taskGroupToMove,
      targetPosition,
      initialCollection
    );

    expect(finalCollection[targetPosition]._id).toBe(taskGroupToMove);
    expect(finalCollection[targetPosition].nextPosition).toBe(targetPosition);
    expect(finalCollection).toHaveLength(initialCollection.length);

    finalCollection.forEach((taskGroup, index) => {
      expect(taskGroup.nextPosition).toBe(index);
    });
  });

  test("Should update all positions of items moving from greater index to less index", () => {
    const taskGroupToMove = "3";
    const targetPosition = 1;

    const finalCollection = relocateTaskGroup(
      taskGroupToMove,
      targetPosition,
      initialCollection
    );

    expect(finalCollection[targetPosition]._id).toBe(taskGroupToMove);
    expect(finalCollection[targetPosition].nextPosition).toBe(targetPosition);
    expect(finalCollection).toHaveLength(initialCollection.length);

    finalCollection.forEach((taskGroup, index) => {
      expect(taskGroup.nextPosition).toBe(index);
    });
  });

  test("Should update all positions of items moving from head index to tail index", () => {
    const taskGroupToMove = "0";
    const targetPosition = 4;

    const finalCollection = relocateTaskGroup(
      taskGroupToMove,
      targetPosition,
      initialCollection
    );

    expect(finalCollection[targetPosition]._id).toBe(taskGroupToMove);
    expect(finalCollection[targetPosition].nextPosition).toBe(targetPosition);
    expect(finalCollection).toHaveLength(initialCollection.length);

    finalCollection.forEach((taskGroup, index) => {
      expect(taskGroup.nextPosition).toBe(index);
    });
  });

  test("Should update all positions of items moving from tail index to head index", () => {
    const taskGroupToMove = "4";
    const targetPosition = 0;

    const finalCollection = relocateTaskGroup(
      taskGroupToMove,
      targetPosition,
      initialCollection
    );

    expect(finalCollection[targetPosition]._id).toBe(taskGroupToMove);
    expect(finalCollection[targetPosition].nextPosition).toBe(targetPosition);
    expect(finalCollection).toHaveLength(initialCollection.length);

    finalCollection.forEach((taskGroup, index) => {
      expect(taskGroup.nextPosition).toBe(index);
    });
  });

  test("Should throw an error when it's trying to move to invalid index", () => {
    const taskGroupToMove = "0";
    const targetPosition = 10;

    expect(() =>
      relocateTaskGroup(taskGroupToMove, targetPosition, initialCollection)
    ).toThrow();
  });
});
