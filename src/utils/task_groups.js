/**
 * Function to relocate a task group position inside a task group collection
 *
 * @param {String} taskGroupId
 * @param {Number} taskGroupNextPosition
 * @param {Object[]} taskGroups
 * @returns
 */
const relocateTaskGroup = (taskGroupId, taskGroupNextPosition, taskGroups) => {
  if (taskGroupNextPosition >= taskGroups.length)
    throw new Error(
      `Invalid position, there are only ${taskGroups.length} task groups.`
    );

  let taskGroupToMove;
  let otherTaskGroups = [];

  taskGroups.forEach((taskGroup) => {
    // Extract essential data for sorting operation
    const taskGroupData = {
      _id: taskGroup._id,
      currentPosition: taskGroup.position,
    };

    // Split de task groups in target task group and the rest of task groups
    if (taskGroup._id.equals(taskGroupId)) {
      taskGroupData.nextPosition = taskGroupNextPosition;

      taskGroupToMove = taskGroupData;
    } else {
      otherTaskGroups.push(taskGroupData);
    }
  });

  // Sort task groups before inserting the changed task group
  otherTaskGroups.sort((a, b) => a.currentPosition - b.currentPosition);

  // Insert the task group in expected position
  otherTaskGroups.splice(taskGroupNextPosition, 0, taskGroupToMove);

  // Sync the next position with final indexes
  otherTaskGroups = otherTaskGroups.map((taskGroup, index) => ({
    ...taskGroup,
    nextPosition: index,
  }));

  return otherTaskGroups;
};

module.exports = { relocateTaskGroup };
