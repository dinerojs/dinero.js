type ParametersProps = {
  children: React.ReactNode;
};

function isReactElement(element: React.ReactNode): element is React.ReactElement {
  return (element as React.ReactElement).hasOwnProperty('props');
}

export function Parameters({ children }: ParametersProps) {
  if (Array.isArray(children)) {
    const parameters = children.filter((child): child is React.ReactElement => {
      return isReactElement(child) && child.props.mdxType === 'Parameter';
    });

    return (
      <table>
        <tbody>
          {parameters.map(({ props }) => (
            <tr key={props.name}>
              <td>
                <span id={`parameter-${props.name}`}>{props.name}</span>
              </td>
              <td>
                <span>{props.type}</span>
                {props.required && <span>Required</span>}
                <div>{props.children}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return null;
}

type ParameterProps = {
  children: React.ReactNode;
  name: string;
  type: string;
  required: boolean;
};

export function Parameter({ children }: ParameterProps) {
  return children
}
